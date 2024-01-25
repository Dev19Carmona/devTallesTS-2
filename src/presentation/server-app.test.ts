import { CreateTable } from '../domain/use-cases/create-table.use-case'
import { SaveFile } from '../domain/use-cases/save-file.use-case'
import { ServerApp } from './server-app'
describe('server-app', () => {
  const options = {
    base: 2,
    limit: 10,
    show: false,
    name: 'test-fileName',
    destination: 'test-destionation',
  }
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('should create server app instance', () => {
    const serverApp = new ServerApp()
    expect(serverApp).toBeInstanceOf(ServerApp)
    expect(typeof ServerApp.run).toBe('function')
  })
  test('should run serverApp with Options', () => {
    // const logSpy = jest.spyOn(console, 'log')
    // const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute')
    // const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute')
    // let timesCalled: number = 2
    // if (options.show) timesCalled += 1
    // ServerApp.run(options)
    // expect(logSpy).toHaveBeenCalledTimes(timesCalled)
    // expect(logSpy).toHaveBeenCalledWith('Server Running...')
    // expect(logSpy).toHaveBeenCalledWith('File Created')
    // expect(createTableSpy).toHaveBeenCalledTimes(1)
    // expect(createTableSpy).toHaveBeenCalledWith({
    //   base: options.base,
    //   limit: options.limit,
    // })
    // expect(saveFileSpy).toHaveBeenCalledTimes(1)
    // expect(saveFileSpy).toHaveBeenCalledWith({
    //   fileContent: expect.any(String),
    //   fileDestionation: options.destination,
    //   fileName: options.name,
    // })
  })
  test('should run with custom values mocks', () => {
    const logMock = jest.fn()
    const logErrorMock = jest.fn()
    const createMock = jest.fn().mockReturnValue('1 x 2 = 2')
    const saveFileMock = jest.fn().mockReturnValue(true)
    console.log = logMock
    console.error = logErrorMock
    CreateTable.prototype.execute = createMock
    SaveFile.prototype.execute = saveFileMock
    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledWith('Server Running...')
    // expect(logErrorMock).toHaveBeenCalledWith('Error created')
    expect(createMock).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    })
    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: '1 x 2 = 2',
      fileDestination: options.destination,
      fileName: options.name
    })
  })
})
