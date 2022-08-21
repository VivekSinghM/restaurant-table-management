import secrets

secret_key = "854ea1961c38c22e3765ae19ff9530e2"
# secret_key = secrets.token_hex(16) // to genrate secret_key

oracle, postgress, mysql= 'oracle','postgress','mysql'
SQL_URI={
    oracle: 'oracle://hr:hr@localhost:1521/xe',
    # postgress: 'postgresql://postgres:root@localhost/RTM_DB',
    postgress: 'postgresql://aatdbfueskfdda:4e4781ba808e52bdf9fca9b1a69a3d7e160a04bd5dc7cecb8c7749a2ac3ec51e@ec2-3-225-110-188.compute-1.amazonaws.com:5432/dcisf9fonmofjo',
    mysql: 'mysql://root:root@localhost/day16'
}
mongodb='mogodb'
NOSQL_URI= {
    mongodb:'mongodb+srv://user1:HiwaW0Jo4eBNeJTD@cluster0.sydu8iv.mongodb.net/test'
    # mongodb:'mongodb://localhost:27017/'
}
table_base_URL="/"
base_file_path="/"
