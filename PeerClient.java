import java.io.*;
import java.net.*;

public class PeerClient {

    public static void downloadFile(String ip, int port, String fileName) {
        try {
            Socket socket = new Socket(ip, port);

            DataOutputStream dos = new DataOutputStream(socket.getOutputStream());
            DataInputStream dis = new DataInputStream(socket.getInputStream());

            dos.writeUTF(fileName);

            long fileSize = dis.readLong();
            if (fileSize == -1) {
                System.out.println("File not found on peer");
                socket.close();
                return;
            }

            File outFile = new File("downloads/" + fileName);
            System.out.println("Saving file to: " + outFile.getAbsolutePath());
            FileOutputStream fos = new FileOutputStream(outFile);

            byte[] buffer = new byte[4096];
            int bytes;
            long received = 0;

            while (received < fileSize &&
                  (bytes = dis.read(buffer)) != -1) {
                fos.write(buffer, 0, bytes);
                received += bytes;
            }

            fos.close();
            socket.close();

            System.out.println("Download complete");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
