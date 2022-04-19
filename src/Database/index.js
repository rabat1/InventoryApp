import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "Myshop.db";
const database_version = "1.0";
const database_displayname = "SQLiteOfflineDb";
const database_size = 200000;

export default class Database {

  initDB() {
    let db;
    return new Promise((resolve) => {
      //    console.log("Plugin integrity check ...");
      SQLite.echoTest()
        .then(() => {
          //      console.log("Integrity check passed ...");
          //    console.log("Opening database ...");
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size
          )
            .then(DB => {
              db = DB;
              //  console.log("Database OPEN");
              db.executeSql('SELECT 1 FROM Orders LIMIT 1').then(() => {
                //  db.executeSql('DROP TABLE IF EXISTS Inventory '); 
                //  db.executeSql('DROP TABLE IF EXISTS Orders '); 
                //  db.executeSql('DROP TABLE IF EXISTS Transactiondet '); 
                //  db.executeSql('DROP TABLE IF EXISTS Customer '); 
                //  db.executeSql('DROP TABLE IF EXISTS SalesHistory '); 
                //  db.executeSql('DROP TABLE IF EXISTS User '); 

                //   console.log("Database is dleted ... executing query ...");

                //        console.log("Database is ready ... executing query ...");
              }).catch((error) => {
              //  console.log("Received error: ", error);
                console.log("Database not yet ready ... populating data");
                db.transaction((tx) => {

                  tx.executeSql('CREATE TABLE IF NOT EXISTS Inventory (itemId TEXT PRIMARY KEY NOT NULL, itemName TEXT NOT NULL, itemDesc TEXT, costPerUnit INTEGER NOT NULL ,itemImage TEXT,itemStock INTEGER NOT NULL,salePricePerUnit INTEGER NOT NULL,createdOn TEXT NOT NULL )');
                  tx.executeSql('CREATE TABLE IF NOT EXISTS Customer (customerId INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, customerName TEXT NOT NULL, customerPhone INTEGER NOT NULL,customerCreatedOn TEXT NOT NULL)');
                  tx.executeSql('CREATE TABLE IF NOT EXISTS Orders ( orderId INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, status TEXT NOT NULL,unitsOrdered INTEGER NOT NULL,  totalPrice INTEGER NOT NULL, orderCreatedOn TEXT NOT NULL, itemId TEXT , costPerUnit INTEGER, salePricePerUnit INTEGER, FOREIGN KEY (itemId) REFERENCES Inventory(itemId) ON DELETE CASCADE  )');
                  tx.executeSql('CREATE TABLE IF NOT EXISTS User (userId INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, userCNIC TEXT NOT NULL )');
                  tx.executeSql('CREATE TABLE IF NOT EXISTS SalesHistory (salesId INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,status DEFAULT COMPLETED, OrderCompletedOn TEXT NOT NULL, orderId INTEGER, itemId TEXT, FOREIGN KEY (orderId) REFERENCES Orders(orderId), FOREIGN KEY(itemId) REFERENCES Inventory(itemId) )');
                  // // tx.executeSql('CREATE TABLE IF NOT EXISTS Transactiondet (transactionId INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,transDate TEXT NOT NULL,salesId INTEGER,customerId INTEGER,FOREIGN KEY (salesId) REFERENCES SalesHistory(salesId) ON UPDATE CASCADE ON DELETE CASCADE, FOREIGN KEY(customerId) REFERENCES Customer(customerId) ON DELETE CASCADE ON UPDATE CASCADE)');

                }).then(() => {
                  console.log("Tables created successfully");
                }).catch(error => {
                  console.log(error);
                });
              });
              resolve(db);
            }

            )
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log("echoTest failed - plugin not functional");
        });
    });
  };

  closeDatabase(db) {
    if (db) {
        //console.log("Closing DB");
      db.close()
        .then(status => {
          // console.log("Database CLOSED");
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log("Database was not OPENED");
    }
  };

  addProductItem(prod) {
    const time = new Date().toLocaleString();
    prod.createdOn = time;
    var saleprice = parseInt(prod.salePricePerUnit);
    var costprice = parseInt(prod.costPerUnit);

    prod.salePricePerUnit = saleprice;
    prod.costPerUnit = costprice;
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('INSERT INTO Inventory VALUES (?, ?, ?, ?, ?, ?,?,?)', [prod.itemId, prod.itemName, prod.itemDesc, prod.costPerUnit, prod.itemImage, prod.itemStock, prod.salePricePerUnit, prod.createdOn]).then(([tx, results]) => {
            resolve(results);
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          resolve(err);
        });
      }).catch((err) => {
      });
    });
  }

  listProduct() {
    return new Promise((resolve) => {
      const products = [];
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM Inventory', []).then(([tx, results]) => {
            var len = results.rows.length;
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              const { itemId, itemName, itemDesc, itemImage, salePricePerUnit, itemStock, costPerUnit } = row;
              products.push({
                itemId,
                itemName,
                itemDesc,
                itemImage,
                salePricePerUnit,
                itemStock,
                costPerUnit
              });
            }
            resolve(products);
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  productById(id) {
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM Inventory WHERE itemId = ?', [id]).then(([tx, results]) => {
            if (results.rows.length > 0) {
              let row = results.rows.item(0);
              resolve(row);
            }
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  };

  deleteProduct(id) {
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('DELETE FROM Inventory WHERE itemId = ?', [id]).then(([tx, results]) => {
            resolve(results);
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  updateProduct(prod, id) {
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('UPDATE Inventory SET itemName = ?, itemDesc = ?, itemImage = ?, salePricePerUnit = ?,itemStock=?,costPerUnit=? WHERE itemId = ?', [prod.itemName, prod.itemDesc, prod.itemImage, prod.salePricePerUnit, prod.itemStock, prod.costPerUnit, id]).then(([tx, results]) => {
            resolve(results);
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }



  updateProductAfterOrder(id, updatedStock) {
    
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('UPDATE Inventory SET itemStock=? WHERE itemId = ?', [updatedStock, id]).then(([tx, results]) => {
            resolve(results);
          }
          );
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }


  listCustomers() {
    return new Promise((resolve) => {
      const customers = [];
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM Customer', []).then(([tx, results]) => {
            var len = results.rows.length;
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              const { customerId, customerName, customerPhone } = row;
              customers.push({
                customerId,
                customerName,
                customerPhone,
              });
            }
            resolve(customers);
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  addCustomer(customer) {
    const time = new Date().toLocaleString();
    customer.createdOn = time;

    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('INSERT INTO Customer VALUES (?,?, ?, ?)', [, customer.customerName, customer.customerPhone, customer.createdOn]).then(([tx, results]) => {
            resolve(results);
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
        });
      }).catch((err) => {
      });
    });
  }

  deleteCustomer(id) {
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('DELETE FROM Customer WHERE customerId = ?', [id]).then(([tx, results]) => {
            resolve(results);
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  updateCustomer(customer, id) {
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('UPDATE Customer SET customerName = ?, customerPhone = ? WHERE customerId = ?', [customer.customerName, customer.customerPhone, id]).then(([tx, results]) => {
            resolve(results);
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  addOrder(itemId, unitsOrdered, itemName,status,totalPrice,costPerUnit,salePricePerUnit) {
    
    const orderCreatedOn = new Date().toLocaleString();
    
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('INSERT INTO Orders VALUES (?, ?, ?, ?, ?, ?,?,?)', [,status, unitsOrdered, totalPrice, orderCreatedOn, itemId,costPerUnit,salePricePerUnit]).then(([tx, results]) => {
            resolve(results);
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
        });
      }).catch((err) => {
      });
    });
  }

  listOrders() {
    return new Promise((resolve) => {
      const orders = [];
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('SELECT Orders.orderId,Orders.status,Orders.totalPrice,Orders.orderCreatedOn,Orders.unitsOrdered,Inventory.itemName,Inventory.itemId FROM Orders INNER JOIN Inventory ON Orders.itemId=Inventory.itemId', []).then(([tx, results]) => {
            var len = results.rows.length;
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              const { orderId, status, totalPrice,orderCreatedOn,unitsOrdered,itemName,itemId } = row;
              orders.push({
                orderId, status, totalPrice,orderCreatedOn,unitsOrdered,itemName,itemId
              });
            }
            resolve(orders);
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }

updateOrderStatus(id) {
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('UPDATE Orders SET status = ? WHERE orderId = ?', ['Completed', id]).then(([tx, results]) => {
            resolve(results);
          });
        }).then((result) => {
         // this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  addSalesHistory(orderId,itemId) {
    
    const OrderCompletedOn = new Date().toLocaleString();
    const status="Completed";
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('INSERT INTO SalesHistory VALUES (?, ?, ?, ?, ?)', [,status, OrderCompletedOn, orderId,itemId]).then(([tx, results]) => {
            resolve(results);
            
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
        });
      }).catch((err) => {
      });
    });
  }

  listSalesHistory() {
    return new Promise((resolve) => {
      const orders = [];
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('select Inventory.itemName,Orders.salePricePerUnit,Orders.costPerUnit,SalesHistory.OrderCompletedOn,Orders.unitsOrdered,Orders.totalPrice FROM SalesHistory INNER JOIN Inventory ON SalesHistory.itemId=Inventory.itemId INNER JOIN Orders ON SalesHistory.orderId=Orders.orderId', []).then(([tx, results]) => {
            var len = results.rows.length;
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              const { itemName, salePricePerUnit, costPerUnit,OrderCompletedOn,unitsOrdered,totalPrice} = row;
              orders.push({
                itemName, salePricePerUnit, costPerUnit,OrderCompletedOn,unitsOrdered,totalPrice
              });
            }
            resolve(orders);
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }
}