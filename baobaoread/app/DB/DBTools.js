var DBTools={
	//第一次运行程序创建数据库
	CreateTable:function (){
		var create_table_sql=new Array();
		create_table_sql[0]='CREATE TABLE "datainfo" ("arcid"  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,"arctitle"  TEXT,"shopId"  INTEGER,"typeID"  INTEGER,"goodsInfo"  TEXT)';
		create_table_sql[1]='CREATE TABLE "imageinfo" ("id"  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,"goodsId"  INTEGER,"iconUrl"  TEXT,"imageUrl"  TEXT,"uploadTime"  TEXT)';
		create_table_sql[2]='CREATE TABLE "shopinfo" ("id"  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,"name"  TEXT,"shopkeeper"  TEXT,"phone"  TEXT,"position"  TEXT)';
		create_table_sql[3]='CREATE TABLE "typeinfo" ("id"  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,"name"  TEXT,"remarks"  TEXT)';
		dbhelper.TransactionSql(create_table_sql);
		DBTools.AddGoodsType("短袖","夏天的上衣");
		DBTools.AddGoodsType("短袖","夏天的上衣");
		DBTools.AddGoodsType("短袖","夏天的上衣");
		DBTools.AddGoodsType("短袖","夏天的上衣");
		DBTools.AddGoodsType("短袖","夏天的上衣");
		DBTools.AddGoodsType("短袖","夏天的上衣");
		DBTools.AddGoodsType("短袖","夏天的上衣");
		DBTools.AddGoodsType("短袖","夏天的上衣");
	},
	//添加商品信息并且返回商品id
   AddGoodsInfoWithAction:function (name,shopId,typeId,goodsRemark,returnInsertId)
   {
       	var Info=GoodsInfoModel.CreateNew();
       	Info.goodsName=name;
       	Info.shopId=shopId;
       	Info.typeID=typeId;
        Info.goodsInfo=goodsRemark;
       	var dal =GoodsInfoDal.CreateNew();
       	dal.add(Info,function(contect,results)
       	{
       		returnInsertId(results.insertId);
       	});
   },
   //插入图片信息
   AddImageInfo:function(goodsId,iconurl,imageUrl)
   {
		var imageinfo = ImageInfoModel.CreateNew();
		imageinfo.goodsId=goodsId;
		imageinfo.iconUrl=iconurl;
		imageinfo.imageUrl=imageUrl;
		imageinfo.uploadTime=CurentTime();
		var imagedal =ImageInfoDal.CreateNew();
		imagedal.add(imageinfo);
   },
   //根据条件获取对应的图片数据
   GetImageInfoByWhere:function (where,resultfunction)
   {
       	var dal =ImageInfoDal.CreateNew();
		dal.select(where,function(result)
		{
			try  
    		{  
    			var imageinfoArr = Array();
	            //获取所有行  
	            var rowList = result.rows;  
	            //获取每行的记录  
	            for(var i = 0; i < rowList.length; i++)  
	            {  
	                var row = rowList.item(i); 
	                var imageinfomodel=ImageInfoModel.CreateNew();
	                imageinfomodel.id=row["id"];
	                imageinfomodel.goodsId=row["goodsId"];
	                imageinfomodel.iconUrl=row["iconUrl"];
	                imageinfomodel.imageUrl=row["imageUrl"];
	                imageinfomodel.uploadTime=row["uploadTime"];
	                imageinfoArr.push(imageinfomodel);
	            }  
	            resultfunction(imageinfoArr);
	        }  
	        catch(err)  
	        {  
	            console.log(err.message?err.message:err.toString());  
	        }   
            
		});
   },
    //获取所有的图片数据
   GetAllImageInfo:function (resultfunction)
   {
		DBTools.GetImageInfoByWhere("1=1",resultfunction);
   },
   //删除一个商品的所有信息
   DeleteGoodsInfo:function(goodsid)
   {
  	 	var goodsDal=GoodsInfoDal.CreateNew();
  	 	goodsDal.del(goodsid);
  	 	var imageDal=ImageInfoDal.CreateNew();
  	 	imageDal.del(goodsid);
   },
   //获取ID对应的商品数据
   GetGoodsInfoByGoodsId:function (goodsId,resultfunction)
   {
       	var dal =GoodsInfoDal.CreateNew();
		dal.select("where id = "+goodsId,function(result)
		{
			try  
    		{  
    			var goodsinfoArr = Array();
	            //获取所有行  
	            var rowList = result.rows;  
	            //获取每行的记录  
	            for(var i = 0; i < rowList.length; i++)  
	            {  
	                var row = rowList.item(i); 
	                var goodsinfomodel=GoodsInfoModel.CreateNew();
	                goodsinfomodel.id=row["id"];
	                goodsinfomodel.name=row["name"];
	                goodsinfomodel.shopId=row["shopId"];
	                goodsinfomodel.typeId=row["phone"];
	                goodsinfomodel.goodsInfo=row["goodsInfo"];
	                goodsinfoArr.push(goodsinfomodel);
	            }  
	            queryResult(goodsinfoArr);
	        }  
	        catch(err)  
	        {  
	            console.log(err.message?err.message:err.toString());  
	        }   
            
		});
   },
   //添加类型
   AddGoodsType:function (typeName,remark)
   {
       	var typeInfo=TypeInfoModel.CreateNew();
       	typeInfo.name=typeName;
       	typeInfo.remarks=remark;
       	var dal =TypeInfoDal.CreateNew();
       	dal.add(typeInfo);
   },
   //获取所有的类型
   GetAllType:function (resultfunction)
   {
       	var dal =TypeInfoDal.CreateNew();
		dal.select("1=1",function(result)
		{
			try  
    		{  
    			var typeinfoArr = Array();
	            //获取所有行  
	            var rowList = result.rows;  
	            //获取每行的记录  
	            for(var i = 0; i < rowList.length; i++)  
	            {  
	                var row = rowList.item(i); 
	                var typeinfomodel=TypeInfoModel.CreateNew();
	                typeinfomodel.id=row["id"];
	                typeinfomodel.name=row["name"];
	                typeinfomodel.remarks=row["remarks"];
	                typeinfoArr.push(typeinfomodel);
	            }  
	            resultfunction(typeinfoArr);
	        }  
	        catch(err)  
	        {  
	            console.log(err.message?err.message:err.toString());  
	        }   
            
		});
   },
   //添加店铺数据
   AddShopInfo:function (name,shopkeeper,phone,position)
   {
       	var shopInfo=ShopInfoModel.CreateNew();
       	shopInfo.name=name;
       	shopInfo.shopkeeper=shopkeeper;
       	shopInfo.phone=phone;
       	shopInfo.position=position;
       	var dal =ShopInfoDal.CreateNew();
       	dal.add(shopInfo);
   },
   //获取所有的店铺数据
   GetAllShopInfo:function (resultfunction)
   {
       	var dal =ShopInfoDal.CreateNew();
		dal.select("1=1",function(result)
		{
			try  
    		{  
    			var shopinfoArr = Array();
	            //获取所有行  
	            var rowList = result.rows;  
	            //获取每行的记录  
	            for(var i = 0; i < rowList.length; i++)  
	            {  
	                var row = rowList.item(i); 
	                var shopinfomodel=ShopInfoModel.CreateNew();
	                shopinfomodel.id=row["id"];
	                shopinfomodel.name=row["name"];
	                shopinfomodel.shopkeeper=row["shopkeeper"];
	                shopinfomodel.phone=row["phone"];
	                shopinfomodel.position=row["position"];
	                shopinfoArr.push(shopinfomodel);
	            }  
	           // console.log(shopinfoArr);
	           // console.log(resultfunction);
	            resultfunction(shopinfoArr);
	            
	        }  
	        catch(err)  
	        {  
	           // console.log(err.message?err.message:err.toString());  
	        }   
            
		});
   },
   
}




//Model层
//商品表
var GoodsInfoModel = 
{
	CreateNew:  function ()
	{
		var goodsInfoModel = new Object();
		goodsInfoModel.id = "";//商品id
		goodsInfoModel.name = "";//商品名
		goodsInfoModel.shopId = "";//店铺名
		goodsInfoModel.typeId = "";//类型名
		goodsInfoModel.goodsInfo = "";//备注
		return goodsInfoModel;
	}
	
}

//店铺表
var ShopInfoModel = 
{
	CreateNew:  function ()
	{
		var shopInfoModel = new Object();
		shopInfoModel.id = "";//店铺id
		shopInfoModel.name = "";//店铺名
		shopInfoModel.shopkeeper = "";//店主名
		shopInfoModel.phone = "";//联系电话
		shopInfoModel.position = "";//位置
		return shopInfoModel;
	}
	
}

//分类表
var TypeInfoModel = 
{
	CreateNew:  function ()
	{
		var typeInfoModel = new Object();
		typeInfoModel.id = "";//分类id
		typeInfoModel.name = "";//分类名
		typeInfoModel.remarks = "";//备注
		return typeInfoModel;
	}
	
}

//图片信息表
var ImageInfoModel = 
{
	CreateNew:  function ()
	{
		var imageInfoModel = new Object();
		imageInfoModel.id = "";//图片id
		imageInfoModel.goodsId = "";//商品id
		imageInfoModel.iconUrl = "";//缩略图路径
		imageInfoModel.imageUrl = "";//原图片路径
		imageInfoModel.uploadTime = "";//上传时间
		return imageInfoModel;
	}
	
}


//数据库操作帮助类
var DBHelper = {
	CreateNew: function(dbconnection, remarks)
	{
		var dbHelper = new Object();
		//openDatabase方法打开已经存在的数据库，如果不存在将会创建一个数据库
		var db = window.openDatabase(dbconnection,"1.0",remarks,"2*1024*1024");

		//执行一组事务
		dbHelper.TransactionSql = function( sqlArrays)
		{
			//transaction：这个方法让我们能够控制一个事务，以及基于这种情况执行提交或者回滚。
			db.transaction(function(tx){
				for (sql in sqlArrays)
				{
					console.log(sqlArrays[sql]);
					//执行sql语句
					tx.executeSql(sqlArrays[sql],null,function(context, results)
					{
						console.log(context);
						console.log(results);
					},function(context,error)
					{
						console.log("ErrorCode "+error.code+":"+error.message);
					});
				}
			});
		};
		//执行sql语句
		dbHelper.ExecuteSqlSql1= function (sql) 
		{
			//transaction：这个方法让我们能够控制一个事务，以及基于这种情况执行提交或者回滚。
				db.transaction(function(tx){
					//执行sql语句
					tx.executeSql(sql,null,function(context, results)
					{
						console.log(context);
						console.log(results);
					},function(context,error)
					{
						console.log("ErrorCode "+error.code+":"+error.message);
					});
				});
		};
		
		//执行sql语句
		dbHelper.ExecuteSqlSql2= function (sql,arr) 
		{
			//transaction：这个方法让我们能够控制一个事务，以及基于这种情况执行提交或者回滚。
				db.transaction(function(tx){
					console.log(sql);
					console.log(arr);
					//执行sql语句
					tx.executeSql(sql,arr,function(context, results)
					{
						console.log(context);
						console.log(results);
					},function(context,error)
					{
						console.log("ErrorCode "+error.code+":"+error.message);
					});
				});
		};
		
		//执行sql语句
		dbHelper.ExecuteSqlSql3= function (sql,arr,func1) 
		{
			//transaction：这个方法让我们能够控制一个事务，以及基于这种情况执行提交或者回滚。
				db.transaction(function(tx){
					console.log(sql);
					console.log(arr);
					//执行sql语句
					tx.executeSql(sql,arr,func1,function(context,error)
					{
						console.log("ErrorCode "+error.code+":"+error.message);
					});
				});
		};
		
		//执行sql语句
		dbHelper.ExecuteSqlSql4= function (sql,arr,func1,func2) 
		{
			//transaction：这个方法让我们能够控制一个事务，以及基于这种情况执行提交或者回滚。
				db.transaction(function(tx){
					//执行sql语句
					tx.executeSql(sql,arr,func1,func2);
				});
		};

		return dbHelper;
	}
}



//数据库操作DAL层
var dbhelper = DBHelper.CreateNew("goods","存储商品信息");
var GoodsInfoDal = {
	CreateNew:function()
	{
		var goodsInfoDal = new Object();
		//增
		goodsInfoDal.add = function(model,endAction)
		{
			var add_goods_sql = 'INSERT INTO goodsinfo(goodsName,shopId,typeID,goodsInfo) values (?,?,?,?)'
			     ;
			var paras = [model.goodsName,model.shopId,model.typeID,model.goodsInfo];
			dbhelper.ExecuteSqlSql3(add_goods_sql,paras,endAction);
		};
		//删
		goodsInfoDal.del=function( id)
		{
			var del_goods_sql='DELETE FROM goodsinfo WHERE id=？';
			var paras =[id];
			dbhelper.ExecuteSqlSql2(del_goods_sql,[id]);
		};
		//改
		goodsInfoDal.update=function( model)
		{
			var upd_goods_sql='UPDATE goodsinfo SET goodsName="?",shopId="?",typeID="?",goodsInfo="?" WHERE id=?';
			var paras = [model.goodsName,model.shopId,model.typeID,model.goodsInfo,model.id];
			dbhelper.ExecuteSqlSql2(upd_goods_sql,paras);
		};
		
		//查
		goodsInfoDal.select=function( where, resultsfunction)
		{
			var sel_goods_sql='select * from goodsinfo where ?';
			var paras = [where];
			dbhelper.ExecuteSqlSql3(upd_goods_sql,paras,function (context, results) {
     			resultsfunction(results);
            });
		};
		
		return goodsInfoDal;
	}
}

	
var ShopInfoDal = {
	CreateNew:function()
	{
		var shopInfoDal = new Object();
		//增
		shopInfoDal.add = function( model)
		{
			var add_goods_sql = 'INSERT INTO shopinfo(name,shopkeeper,phone,position) values (?,?,?,?)'
			     ;
			var paras = [model.name,model.shopkeeper,model.phone,model.position];
			dbhelper.ExecuteSqlSql2(add_goods_sql,paras);
		};
		//删
		shopInfoDal.del=function( id)
		{
			var del_goods_sql='DELETE FROM shopinfo WHERE id=？';
			var paras =[id];
			dbhelper.ExecuteSqlSql2(del_goods_sql,[id]);
		};
		//改
		shopInfoDal.update=function( model)
		{
			var upd_goods_sql='UPDATE shopinfo SET name="?",shopkeeper="?",phone="?",position="?" WHERE id=?';
			var paras = [model.name,model.shopkeeper,model.phone,model.position,model.id];
			dbhelper.ExecuteSqlSql2(upd_goods_sql,paras);
		};
		
		//查
		shopInfoDal.select=function( where, resultsfunction)
		{
			var sel_goods_sql='select * from shopinfo where ?';
			var paras = [where];
			dbhelper.ExecuteSqlSql3(sel_goods_sql,paras,function (context, results) {
     			resultsfunction(results);
            });
		};
		
		return shopInfoDal;
	}
}

var TypeInfoDal = {
	CreateNew:function()
	{
		var typeInfoDal = new Object();
		//增
		typeInfoDal.add = function( model)
		{
			var add_goods_sql = 'INSERT INTO typeinfo (name,remarks) values (?,?)'
			     ;
			var paras = [model.name,model.remarks];
			dbhelper.ExecuteSqlSql2(add_goods_sql,paras);
		};
		//删
		typeInfoDal.del=function( id)
		{
			var del_goods_sql='DELETE FROM typeinfo WHERE id=？';
			var paras =[id];
			dbhelper.ExecuteSqlSql2(del_goods_sql,[id]);
		};
		//改
		typeInfoDal.update=function( model)
		{
			var upd_goods_sql='UPDATE typeinfo SET name="?",remarks="?" WHERE id=?';
			var paras = [model.name,model.remarks,model.id];
			dbhelper.ExecuteSqlSql2(upd_goods_sql,paras);
		};
		
		//查
		typeInfoDal.select=function( where, resultsfunction)
		{
			var sel_goods_sql='select * from typeinfo where ?';
			var paras = [where];
			dbhelper.ExecuteSqlSql3(sel_goods_sql,paras,function (context, results) {
     			resultsfunction(results);
            });
		};
		return typeInfoDal;
	}
}

var ImageInfoDal = {
	CreateNew:function()
	{
		var imageInfoDal = new Object();
		//增
		imageInfoDal.add = function( model)
		{
			var add_goods_sql = 'INSERT INTO imageinfo(goodsId,iconUrl,imageUrl,uploadTime) values (?,?,?,?)'
			     ;
			var paras = [model.goodsId,model.iconUrl,model.imageUrl,model.uploadTime];
			dbhelper.ExecuteSqlSql2(add_goods_sql,paras);
		};
		//删
		imageInfoDal.del=function( goodsid)
		{
			var del_goods_sql='DELETE FROM imageinfo WHERE goodsId = ？';
			var paras =[goodsid];
			dbhelper.ExecuteSqlSql2(del_goods_sql,paras);
		};
		//改
		imageInfoDal.update=function( model)
		{
			var upd_goods_sql='UPDATE imageinfo SET goodsId="?",iconUrl="?",imageUrl="?",uploadTime="?"  WHERE id=?';
			var paras = [model.goodsId,model.iconUrl,model.imageUrl,model.uploadTime,model.id];
			dbhelper.ExecuteSqlSql2(upd_goods_sql,paras);
		};
		
		//查
		imageInfoDal.select=function( where, resultsfunction)
		{
			var sel_goods_sql='select * from imageinfo where ?';
			var paras = [where];
			dbhelper.ExecuteSqlSql3(upd_goods_sql,paras,function (context, results) {
     			resultsfunction(results);
            });
		};
		
		return imageInfoDal;
	}
}




//获取当前系统时间，格式：(如:2009-06-12 12:00)
function CurentTime()
    { 
        var now = new Date();
       
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
       
        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
       
        var clock = year + "-";
       
        if(month < 10)
            clock += "0";
       
        clock += month + "-";
       
        if(day < 10)
            clock += "0";
           
        clock += day + " ";
       
        if(hh < 10)
            clock += "0";
           
        clock += hh + ":";
        if (mm < 10) clock += '0'; 
        clock += mm; 
        return(clock); 
    } 