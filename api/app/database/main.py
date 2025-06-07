import psycopg2

class DataBase():
    def get_cursor():
        conexion = psycopg2.connect(
            host="postgres-a940e244.railway.internal",
            database="railway",
            user="postgres",
            password="fXWwjHXLjJIvQdsxmNyNnNnwWkjyodFw",
            port="5432"
        )


        cursor = conexion.cursor()
    
    def create():
        db = DataBase().get_cursor()
