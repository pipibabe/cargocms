## 20170103 1220ERD2.mwb 修正 ERD table 關聯
- Order, OrderStatus (1 : n) 修正為 (1 : 1)
- Order, OrderOption (1 : n) 修正為 (1 : 1)
- OrderProduct , SupplierShipOrderDescription (1 : n) 修正為 (1 : 1)
- Supplier, Product (1 : 1) 修正為 (1 : n)
- ProductOption , ProductOptionValue (1 : n) 修正為 (1 : 1)
- Option , ProductOptionValue (1 : n) 修正為 (1 : 1)
- OptionValue , ProductOptionValue (1 : n) 修正為 (1 : 1)

## 20170104 ERD.v2.mwb
- 移除 SupplierShipOrderDescription 資料表，取消與 OrderProduct , SupplierShipOrder 關聯
- 新增 SupplierShipOrderProduct 資料表，與 SupplierShipOrder , Product 關聯  
  SupplierShipOrder 與 SupplierShipOrderProduct ( 1 : n )
  Product 與 SupplierShipOrderProduct ( 1 : n )
