from http.server import SimpleHTTPRequestHandler, HTTPServer

class MyHandler(SimpleHTTPRequestHandler):
    def guess_type(self, path):
        if path.endswith('.json'):
            return 'application/json'
        elif path.endswith('.js'):
            return 'application/javascript'
        elif path.endswith('.ts'):
            return 'application/typescript'
        return super().guess_type(path)

def run(server_class=HTTPServer, handler_class=MyHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f"Starting server on port {port}...")
    httpd.serve_forever()

if __name__ == '__main__':
    run()
