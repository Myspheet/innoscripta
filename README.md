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

## Setting Up Environment Variables

### Laravel Backend

1. Copy the `.env.example` file to `.env` in the `laravel` directory:

   ```bash
   cp laravel/.env.example laravel/.env
   ```

2. Update the `.env` file with the database credentials to match the Docker setup:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=db
   DB_PORT=3306
   DB_DATABASE=laravel
   DB_USERNAME=laravel
   DB_PASSWORD=secret
   ```

### Vite Frontend

1. Create a `.env` file in the `vite-app` directory:

   ```bash
   touch vite-app/.env
   ```

2. Add the following:
   ```env
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

---

## Running the Application

1. **Build and Start the Containers**:
   In the root directory of your project, run:

   ```bash
   docker-compose up --build
   ```

2. **Access the Applications**:

   - **Laravel Backend**: [http://localhost:8080](http://localhost:8080)
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

- Verify the Laravel backend is running by visiting `http://localhost:8080`.
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
