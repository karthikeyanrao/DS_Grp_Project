# Module 5 – Mess Feedback Live Counter

## Problem Description
The Mess Feedback Live Counter allows students to submit real-time feedback about hostel mess food as Good, Average, or Poor. Multiple users can vote simultaneously, and the updated feedback counts are displayed live on the web interface. This module demonstrates shared memory and synchronization in a distributed system.

## Communication Model Used
This module uses:
- POSIX Shared Memory
- POSIX Semaphores (Mutex)
- HTTP Client–Server communication

Browser clients communicate with a Node.js server, which interacts with a shared memory server running as a separate process.

## System Architecture
Multiple Web Browsers -> Node.js Server -> Shared Memory Server (C++) -> POSIX Shared Memory + Semaphore

All users access the same shared memory, ensuring consistent feedback data across the system.

## In-Memory Data Design
The shared memory stores three integer values:
- Good feedback count
- Average feedback count
- Poor feedback count

These values exist only in RAM and are not persisted.

## Why In-Memory Storage is Appropriate
Mess feedback is short-lived and used only for live monitoring. Old feedback is not required after a session, so persistence is unnecessary. Restarting the server simply resets the counters.

## How Concurrency is Handled
A POSIX semaphore is used to ensure only one process can modify the shared memory at a time, preventing race conditions and lost updates.

## How the System Works
1. User clicks Good, Average, or Poor in the browser.
2. Browser sends HTTP request to Node.js server.
3. Node.js forwards the request to the shared memory server.
4. Shared memory server locks the semaphore, updates the count, reads all values, and unlocks the semaphore.
5. Updated counts are returned and displayed in the browser.

## How to Run
1. Compile and run shared memory server:
   g++ shared_memory_server.cpp -o shm_server -pthread
   ./shm_server

2. Run Node.js server:
   node server.js

3. Open frontend/index.html in a browser.
