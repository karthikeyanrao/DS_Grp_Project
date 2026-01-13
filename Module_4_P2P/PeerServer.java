import java.io.*;
import java.net.*;

public class PeerServer {

    static final int PORT = 5000;

    public static void main(String[] args) {
        try {
            ServerSocket serverSocket = new ServerSocket(PORT);
            System.out.println("Peer Server running on port " + PORT);

            while (true) {
                Socket socket = serverSocket.accept();
                new Thread(() -> handleClient(socket)).start();
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    static void handleClient(Socket socket) {
        try {
            DataInputStream dis = new DataInputStream(socket.getInputStream());
            DataOutputStream dos = new DataOutputStream(socket.getOutputStream());

            String fileName = dis.readUTF();
            File file = new File("shared/" + fileName);

            if (!file.exists()) {
                dos.writeLong(-1);
                socket.close();
                return;
            }

            dos.writeLong(file.length());

            FileInputStream fis = new FileInputStream(file);
            byte[] buffer = new byte[4096];
            int bytes;

            while ((bytes = fis.read(buffer)) != -1) {
                dos.write(buffer, 0, bytes);
            }

            fis.close();
            socket.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
