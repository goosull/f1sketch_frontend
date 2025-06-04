# f1sketch

## Backend configuration

Database connection settings are sourced from environment variables:

- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`

Set these before starting the backend. You can define them in `backend/.env`.

An example file is provided:

```bash
cp backend/.env.example backend/.env
# edit backend/.env with your credentials
```
