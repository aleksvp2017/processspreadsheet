var fs = require('fs')
var path = require('path')
var XLSX = require('xlsx')
var Spreadsheet = require('./spreadsheet.js').structure


const readWorkBook = async (spreadsheetname) => {
    try{
        let buffer = fs.readFileSync(path.join(__dirname, spreadsheetname))
        var workbook = XLSX.read(buffer, {type:"buffer"});
        var worksheet = workbook.Sheets[Spreadsheet.worksheetname]
        if (worksheet == null){
            throw 'Worksheet was not found'
        }
        var data = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: true })
        if (data.length <= 1){
            throw 'No data in the worksheet'
        }

        var header = data[0]
        validateHeader(header)

        var rows = data.splice(1,data.length)
        console.log(rows)
        validateRows(header, rows)

        //iterate throw cells
        rows.map( (row, rowindex) => {
            console.log('==> ROW:', rowindex)
            row.map((cell, col) => {
                if (header[col]){
                    console.log(header[col] + ':' + cell)
                }  
            })
        })


    } catch(error){
        console.log('ERROR:', error)
    }
}

const validateHeader = (header) => {
    Spreadsheet.mandatoryColumns.map((coluna) => {
      if (!header.find(elemento => elemento === coluna)){
        throw 'Column ' + coluna + ' not found.'
      }
    })
  }

const validateRows = (header, rows) => {
    rows.map((row) => {
      row.map((cell, index) => {
        var column = Spreadsheet.columns[header[index]]
        if (column){
            column.validate(cell)
        }
      })
    })
  }



readWorkBook('./Tassi.xlsx')
