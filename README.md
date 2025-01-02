# Running the Application

This guide will help you set up and run the Laravel backend and Vite React frontend applications using Docker.

---

## Prerequisites

Ensure you have the following installed on your system:

- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)

---

## Directory Structure

Ensure your project directory is structured as follows:

```
project-root/
├── newsbe/               # Laravel backend application
├── newsfe/              # Vite React frontend application
├── docker-compose.yml     # Docker Compose configuration file
```

---

On the newsbe, change .env.example to .env

## Running the Application

1. **Build and Start the Containers**:
   In the root directory of your project, run:

   ```bash
   docker-compose up --build
   ```

2. **Access the Applications**:

   - **Laravel Backend**: [http://localhost:8000](http://localhost:8000)
   - **Vite React Frontend**: [http://localhost:3000](http://localhost:3000)

3. **Rebuild Containers** (if necessary):
   If you make changes to the Dockerfiles or configurations, rebuild the containers:

   ```bash
   docker-compose up --build
   ```

4. **Run the migrations**:

   ```bash
   docker-compose run --rm app php artisan migrate
   ```

5. **Run the queue**:

   ```bash
   docker-compose run --rm app php artisan queue:work
   ```

6. **Download the news from the apis**:
   The --fetch command specifies the total number of news to fetch from each source
   ```bash
   docker-compose run --rm app php artisan news:fetch --fetch=100
   ```

---

## Testing the Setup

- Verify the Laravel backend is running by visiting `http://localhost:8000`.
- Verify the Vite React frontend is running by visiting `http://localhost:3000`.
- Test API connectivity by ensuring frontend calls to the backend endpoints return valid data.

---

## Stopping the Application

To stop the application, run:

```bash
docker-compose down
```

---

## Additional Notes

- **Persistent Data**: The MySQL data is stored in a Docker volume named `db-data` and will persist across container restarts.

---

For further assistance, feel free to reach out!
