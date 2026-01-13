import socket, threading, json, os
from datetime import datetime
from http.server import SimpleHTTPRequestHandler, HTTPServer

HOST = "localhost"
PORT = 5500
complaints = []

def socket_server():
    s = socket.socket()
    s.bind((HOST, 9000))
    s.listen()
    while True:
        c, _ = s.accept()
        data = json.loads(c.recv(4096).decode())
        data["timestamp"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        complaints.append(data)
        c.send(json.dumps({"status":"SUCCESS"}).encode())
        c.close()

class Handler(SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path == "/submit":
            length = int(self.headers["Content-Length"])
            data = self.rfile.read(length)

            s = socket.socket()
            s.connect((HOST, 9000))
            s.send(data)
            res = s.recv(1024)
            s.close()

            self.send_response(200)
            self.send_header("Content-Type","application/json")
            self.end_headers()
            self.wfile.write(res)

    def do_GET(self):
        if self.path == "/complaints":
            self.send_response(200)
            self.send_header("Content-Type","application/json")
            self.end_headers()
            self.wfile.write(json.dumps(complaints).encode())
        else:
            super().do_GET()

if __name__ == "__main__":
    os.chdir("frontend")
    threading.Thread(target=socket_server, daemon=True).start()
    print("Open http://localhost:5500")
    HTTPServer((HOST, PORT), Handler).serve_forever()
