# ETB Sonelgaz HR Platform for Access Control

## Introduction
Welcome to the ETB Sonelgaz HR Platform for Access Control. This platform is designed to manage and control access for employees within the organization. The system is built using a modern tech stack, ensuring reliability, scalability, and an engaging user experience.

## Technologies Used
- **Frontend:** Next.js, React Three Fiber
- **Backend:** Spring Boot
- **Database:** MySQL

## Features
- **User Authentication and Authorization:** Secure login and role-based access control.
- **Employee Management:** Add, update, delete, and view employee details.
- **Access Control:** Define and manage access levels for different areas within the organization.
- **3D Visualizations:** Interactive 3D models using React Three Fiber to visualize access zones and employee movements.
- **Real-time Notifications:** Get instant alerts on access breaches or unauthorized attempts.

## Installation

### Prerequisites
- Node.js (>= 14.x)
- Java (>= 11)
- MySQL (>= 8.x)

### Frontend Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/etb-sonelgaz-hr-platform.git
    cd etb-sonelgaz-hr-platform/frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

### Backend Setup
1. Navigate to the backend directory:
    ```bash
    cd ../backend
    ```

2. Build the project:
    ```bash
    ./mvnw clean install
    ```

3. Run the Spring Boot application:
    ```bash
    ./mvnw spring-boot:run
    ```

### Database Setup
1. Create a MySQL database:
    ```sql
    CREATE DATABASE etb_sonelgaz_hr;
    ```

2. Update the `application.properties` file in the backend project with your MySQL credentials:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/etb_sonelgaz_hr
    spring.datasource.username=yourusername
    spring.datasource.password=yourpassword
    ```

## Usage
1. Open your browser and navigate to `http://localhost:3000` to access the frontend.
2. Use the credentials provided by the admin to log in and start managing employee access.

## Contributing
We welcome contributions to enhance the platform. Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
For any queries or support, please contact the project maintainer at support@etbsonelgaz.com.
