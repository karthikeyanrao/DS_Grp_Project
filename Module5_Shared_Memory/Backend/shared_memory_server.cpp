#include <iostream>
#include <sys/mman.h>
#include <fcntl.h>
#include <unistd.h>
#include <semaphore.h>
#include <netinet/in.h>
#include <cstring>

#define SHM_NAME "/mess_shm"
#define SEM_NAME "/mess_sem"
#define PORT 8085

int main() {
    int shm_fd = shm_open(SHM_NAME, O_CREAT | O_RDWR, 0666);
    ftruncate(shm_fd, 12);
    int* data = (int*)mmap(0, 12, PROT_READ | PROT_WRITE, MAP_SHARED, shm_fd, 0);

    sem_t* sem = sem_open(SEM_NAME, O_CREAT, 0666, 1);

    int server_fd = socket(AF_INET, SOCK_STREAM, 0);

    sockaddr_in addr{};
    addr.sin_family = AF_INET;
    addr.sin_port = htons(PORT);
    addr.sin_addr.s_addr = INADDR_ANY;

    bind(server_fd, (sockaddr*)&addr, sizeof(addr));
    listen(server_fd, 5);

    std::cout << "Shared Memory Server running on 8085\n";

    while (1) {
        int client = accept(server_fd, NULL, NULL);
        char buffer[100];
        read(client, buffer, 100);

        sem_wait(sem);

        if (strncmp(buffer, "good", 4) == 0) data[0]++;
        else if (strncmp(buffer, "avg", 3) == 0) data[1]++;
        else if (strncmp(buffer, "poor", 4) == 0) data[2]++;

        char response[50];
        sprintf(response, "%d,%d,%d", data[0], data[1], data[2]);

        sem_post(sem);

        write(client, response, strlen(response));
        close(client);
    }
}
