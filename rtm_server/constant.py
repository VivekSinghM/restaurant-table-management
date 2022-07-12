
import secrets

secret_key = secrets.token_hex(16)

oracle, postgress, mysql= 'oracle','postgress','mysql'
SQL_URI={
    oracle: 'oracle://hr:hr@localhost:1521/xe',
    postgress: 'postgresql://user1:user1@localhost/flask_pg',
    mysql: 'mysql://root:root@localhost/day16'
}
