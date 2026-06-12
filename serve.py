#!/usr/bin/env python3
"""Zero-dependency static server for Training Architect (no Node required).
Usage: python3 serve.py [port]   then open http://localhost:8123
"""
import functools
import os
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

PUBLIC = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'public')
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else int(os.environ.get('PORT', '8123'))

handler = functools.partial(SimpleHTTPRequestHandler, directory=PUBLIC)
print(f'Training Architect at http://localhost:{PORT} (serving {PUBLIC})')
ThreadingHTTPServer(('127.0.0.1', PORT), handler).serve_forever()
