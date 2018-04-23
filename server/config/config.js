var env = process.env.NODE_ENV || "dev";

if (env == "test"){
    process.env.DBURL = "mongodb://localhost:27017/ToDoAppTest"
    process.env.PORT = 4000;
}else if (env == "production"){
    process.env.DBURL = "mongodb://todo:todo@ds155299.mlab.com:55299/todoapi"
}else{
    process.env.DBURL = "mongodb://localhost:27017/ToDoApp"
    process.env.PORT = 5000;
}