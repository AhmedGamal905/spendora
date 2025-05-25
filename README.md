# Spendora ***ReactJS***

**Spendora** is a web application designed to simplify personal finance management. Built with a **React** frontend and a **Laravel** backend, it provides an intuitive platform for tracking income, expenses, and budgeting goals. The application uses **PHP**, **Laravel**, **ReactJS**, **HTML**, **CSS**, **JavaScript**, and **MySQL** to deliver a reliable and user-friendly experience.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Introduction
Spendora was created to assist users in managing their financial transactions by allowing them to track monthly income and expenses, categorize expenses, and perform basic CRUD operations on their financial data. With this platform, users can organize and assess their spending habits to make better-informed budgeting decisions.

## Features
- **Income and Expense Tracking**: Easily track your income and expenses to understand your financial flow.
- **Expense Categorization**: Link your expenses to categories for better organization and clearer insights.
- **CRUD Operations**: Perform create, read, update, and delete operations on your income, expenses, and categories.
- **User-friendly Interface**: An intuitive and simple user interface designed to provide a seamless experience.
- **Data Persistence**: All information is stored securely in a MySQL database, ensuring that your data is safe and easily retrievable.

## Installation
To set up Spendora on your local machine, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/AhmedGamal905/Spendora
    cd Spendora
    ```

2. **Install PHP dependencies**:
    ```bash
    composer install
    ```

3. **Set up environment variables**:
   - Create a `.env` file in the root directory if it doesn’t exist already.
   - Add the necessary configuration values for your environment.

4. **Configure the database** in the `.env` file:
    ```env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=Spendora
    DB_USERNAME=root
    DB_PASSWORD=
    ```

5. **Run migrations and seed the database**:
    ```bash
    php artisan migrate --seed
    ```

6. **Start the development server**:
    ```bash
    php artisan serve
    npm run dev
    ```

Once the server is up and running, you can access the application by navigating to `http://localhost:8000` in your web browser.

## Usage
After setting up the project and starting the development server, users can access the dashboard and begin adding their income and expenses. Key actions include:

- **Creating Income and Expense Entries**: Add your monthly income and expense entries with ease.
- **Categorizing Expenses**: Link each expense to a category to better understand your spending patterns.
- **Managing Categories**: Update or delete categories as needed for more accurate expense tracking.
  
## Contributing
Contributions to Spendora are welcome! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Implement your changes.
4. Test thoroughly to ensure functionality.
5. Submit a pull request.

I appreciate your contributions and will review them as soon as possible.
