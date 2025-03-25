const fs = require('fs');


const reportData = {
  title: 'Reporte de Productos',
  date: new Date().toLocaleString(),
  sales: [
    { product: 'Manzana', quantity: 10, price: 100 },
    { product: 'Chicle', quantity: 5, price: 150 },
    { product: 'Dulce', quantity: 8, price: 200 },
  ],
  total: function() {
    return this.sales.reduce((sum, sale) => sum + sale.quantity * sale.price, 0);
  }
};


function generateReport() {
  const report = {
    title: reportData.title,
    date: reportData.date,
    sales: reportData.sales,
    total: reportData.total()
  };

  
  console.log(`${report.title} - Fecha: ${report.date}`);
  
  
  console.table(report.sales);

  
  const jsonReport = JSON.stringify(report, null, 2);

  
  fs.writeFile('report.json', jsonReport, (err) => {
    if (err) throw err;
    console.log('Reporte guardado como salesReport.json');
  });
}


generateReport();
