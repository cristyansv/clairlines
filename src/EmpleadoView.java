import javax.swing.*;
import java.awt.*;

/**
 * Created by cristyansepulveda on 7/05/16.
 */
public class EmpleadoView extends JFrame {
    private JTextField textField1;
    private JPanel rootPanel;

    public EmpleadoView(){

        setContentPane(rootPanel);

        pack();
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        setVisible(true);
    }
}
