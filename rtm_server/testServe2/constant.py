
import secrets

secret_key = secrets.token_hex(16)

oracle, postgress, mysql= 'oracle','postgress','mysql'
SQL_URI={
    oracle: 'oracle://hr:hr@localhost:1521/xe',
    postgress: 'postgresql://postgres:root@localhost/RTM_DB',
    #postgress: 'postgresql://user1:user1@localhost/RTM_DB',
    mysql: 'mysql://root:root@localhost/day16'
}
table_base_URL="/"
base_file_path="/"