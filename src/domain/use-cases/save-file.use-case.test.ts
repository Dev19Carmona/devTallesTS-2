import { SaveFile } from './save-file.use-case'
import fs from 'fs'
describe('save-file.use-case', () => {
  const customOptions = {
    fileContent: "custom content",
    fileDestination: "custom-outputs",
    fileName: "custom-table-name"
  }
  const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`

  afterEach(() => {
    const outputFolderExist = fs.existsSync('outputs')
    const customOutputFolderExist = fs.existsSync(customOptions.fileDestination)
    if (outputFolderExist)fs.rmSync('outputs', { recursive: true })
    if (customOutputFolderExist)fs.rmSync(customOptions.fileDestination, { recursive: true })
  })
  test('should save file with default values', () => {
    const filePath = 'outputs/table.txt'
    const saveFile = new SaveFile()
    const options = {
      fileContent: 'test content',
    }
    const result = saveFile.execute(options)
    const fileExist = fs.existsSync(filePath)
    const fileContent = fs.readFileSync(filePath, {
      encoding: 'utf-8',
    })

    expect(result).toBe(true)
    expect(fileExist).toBe(true)
    expect(fileContent).toBe(options.fileContent)
  })

  test('should save file with custom values', () => {
    const saveFile = new SaveFile()
    
    const result = saveFile.execute(customOptions)
    const fileExist = fs.existsSync(customFilePath)
    const fileContent = fs.readFileSync(customFilePath, {
      encoding: 'utf-8',
    })
    expect(result).toBe(true)
    expect(fileExist).toBe(true)
    expect(fileContent).toBe(customOptions.fileContent)
  })
})
