import { existsSync, readdirSync, writeFileSync } from 'fs'
import path, { relative, resolve } from 'path'
import { outfitImagesPath } from './config'
import { OutfitData } from './outfits'

const CACHE_FILE_PATH = './cache.generated.txt'

function getFilesSync(dir: string): string[] {
  const dirents = readdirSync(dir, { withFileTypes: true })
  const files = dirents
    .map((dirent) => {
      const res = relative('.', resolve(dir, dirent.name))
      return dirent.isDirectory() ? getFilesSync(res) : res
    })
    .flat()

  return files
}

export const generateCacheIfNeeded = () => {
  const dataPath = path.join(process.cwd(), CACHE_FILE_PATH)

  if (!existsSync(dataPath)) {
    const dirIterator = getFilesSync(outfitImagesPath)
    const outfits: { [outfitId: string]: OutfitData } = {}
    const frameNumbers = Array(10).fill(0)

    for (const filePath of dirIterator) {
      const normalizedFilePath = filePath.replaceAll('\\', '/')
      const outfitIdData = path.dirname(normalizedFilePath).split('/')
      const outfitId = outfitIdData[outfitIdData.length - 1]

      if (!outfits[outfitId]) {
        outfits[outfitId] = {
          files: [],
          framesNumber: 0,
          mountFramesNumber: 0,
        }
      }

      const fileName = path.basename(normalizedFilePath)
      outfits[outfitId].files.push(normalizedFilePath)

      const currentFramesNumber = parseInt(fileName.charAt(0))

      if (Number.isNaN(currentFramesNumber)) {
        continue
      }

      outfits[outfitId].framesNumber = Math.max(
        outfits[outfitId].framesNumber,
        currentFramesNumber
      )
    }

    for (const outfitId in outfits) {
      const outfit = outfits[outfitId]
      const serializedOutfit = JSON.stringify(outfit)
      const outfitDataFilePath = path.join(
        outfitImagesPath,
        outfitId,
        'outfit.data.json'
      )

      try {
        writeFileSync(outfitDataFilePath, serializedOutfit)
      } catch (err) {
        console.error(
          `Node.js cannot write to: "${outfitDataFilePath}", check directory access rights`
        )
      }

      frameNumbers[outfit.framesNumber]++
    }

    const cacheGeneratedFilePath = CACHE_FILE_PATH

    try {
      writeFileSync(cacheGeneratedFilePath, 'cache generated')
    } catch (err) {
      console.log(
        `Node.js cannot write to: "${cacheGeneratedFilePath}", check directory access rights`
      )
      process.exit(1)
    }

    console.log('FILE SYSTEM CACHE GENERATED')
    console.log('Animation frames count in loaded outfits:', frameNumbers)

    return true
  }

  return false
}
