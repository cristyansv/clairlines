import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Date;

/**
 * Created by cristyansepulveda on 7/05/16.
 */
public class BD {
    private Connection connect = null;
    private Statement statement = null;
    private PreparedStatement preparedStatement = null;
    private ResultSet resultSet = null;

    public void readDB() throws Exception {
        try{
            // This will load the MySQL driver, each DB has its own driver
            Class.forName("com.mysql.jdbc.Driver");
            // Setup the connection with the DB
            connect = DriverManager
                    .getConnection("jdbc:mysql://207.223.165.157:3306/clairlines?"
                            + "user=clairlines&password=22clairlines");

            // Statements allow to issue SQL queries to the database
            statement = connect.createStatement();
            // Result set get the result of the SQL query
            resultSet = statement
                    .executeQuery("select * from clairlines.Pasajero");


            while(resultSet.next()) {
                System.out.println(resultSet.getMetaData());
            }


            resultSet.close();

        } catch (Exception e){
            throw e;
        }
    }
}
