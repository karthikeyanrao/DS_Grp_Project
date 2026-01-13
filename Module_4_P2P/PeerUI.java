import javax.swing.*;
import java.awt.*;
import java.io.*;

public class PeerUI {

    public static void main(String[] args) {

        JFrame frame = new JFrame("P2P Resource Sharing");
        frame.setSize(400, 300);
        frame.setLayout(new GridLayout(6, 1));

        JButton uploadBtn = new JButton("Upload File");
        JTextField ipField = new JTextField("Peer IP");
        JTextField portField = new JTextField("5000");
        JTextField fileField = new JTextField("File Name");
        JButton downloadBtn = new JButton("Download File");
        JLabel status = new JLabel("Status");

        frame.add(uploadBtn);
        frame.add(ipField);
        frame.add(portField);
        frame.add(fileField);
        frame.add(downloadBtn);
        frame.add(status);

        uploadBtn.addActionListener(e -> {
            JFileChooser chooser = new JFileChooser();
            int result = chooser.showOpenDialog(frame);

            if (result == JFileChooser.APPROVE_OPTION) {
                File file = chooser.getSelectedFile();
                try {
                    File dest = new File("shared/" + file.getName());
                    FileInputStream fis = new FileInputStream(file);
                    FileOutputStream fos = new FileOutputStream(dest);

                    byte[] buffer = new byte[4096];
                    int bytes;
                    while ((bytes = fis.read(buffer)) != -1) {
                        fos.write(buffer, 0, bytes);
                    }

                    fis.close();
                    fos.close();
                    status.setText("File uploaded");

                } catch (Exception ex) {
                    ex.printStackTrace();
                }
            }
        });

        downloadBtn.addActionListener(e -> {
            String ip = ipField.getText();
            int port = Integer.parseInt(portField.getText());
            String fileName = fileField.getText();

            PeerClient.downloadFile(ip, port, fileName);
            status.setText("Download attempted");
        });

        frame.setVisible(true);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }
}
