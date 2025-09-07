// To-Do App Functionality
document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.querySelector('.todo-form');
    const todoInput = document.querySelector('.todo-input');
    const todoList = document.querySelector('.todo-list');
    const todoFilters = document.querySelectorAll('.todo-filter');
    
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let currentFilter = 'all';
    
    // Initialize the app
    function init() {
        renderTodos();
        setupEventListeners();
    }
    
    // Set up event listeners
    function setupEventListeners() {
        todoForm.addEventListener('submit', addTodo);
        
        todoFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                // Update active filter
                todoFilters.forEach(f => f.classList.remove('active'));
                filter.classList.add('active');
                
                currentFilter = filter.getAttribute('data-filter');
                renderTodos();
            });
        });
    }
    
    // Add a new todo
    function addTodo(e) {
        e.preventDefault();
        
        const todoText = todoInput.value.trim();
        
        if (todoText) {
            const todo = {
                id: Date.now(),
                text: todoText,
                completed: false
            };
            
            todos.push(todo);
            saveTodos();
            renderTodos();
            
            // Clear input
            todoInput.value = '';
        }
    }
    
    // Toggle todo completion
    function toggleTodo(id) {
        todos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        
        saveTodos();
        renderTodos();
    }
    
    // Delete a todo
    function deleteTodo(id) {
        todos = todos.filter(todo => todo.id !== id);
        saveTodos();
        renderTodos();
    }
    
    // Save todos to localStorage
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    
    // Render todos based on current filter
    function renderTodos() {
        // Clear the list
        todoList.innerHTML = '';
        
        let filteredTodos = [];
        
        // Filter todos
        if (currentFilter === 'all') {
            filteredTodos = todos;
        } else if (currentFilter === 'active') {
            filteredTodos = todos.filter(todo => !todo.completed);
        } else if (currentFilter === 'completed') {
            filteredTodos = todos.filter(todo => todo.completed);
        }
        
        // Render todos
        if (filteredTodos.length === 0) {
            const emptyMessage = document.createElement('li');
            emptyMessage.classList.add('todo-item');
            emptyMessage.textContent = 'No tasks found.';
            emptyMessage.style.justifyContent = 'center';
            todoList.appendChild(emptyMessage);
        } else {
            filteredTodos.forEach(todo => {
                const todoItem = document.createElement('li');
                todoItem.classList.add('todo-item');
                if (todo.completed) {
                    todoItem.classList.add('completed');
                }
                
                todoItem.innerHTML = `
                    <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                    <span class="todo-text">${todo.text}</span>
                    <div class="todo-actions">
                        <button class="complete-btn"><i class="fas ${todo.completed ? 'fa-undo' : 'fa-check'}"></i></button>
                        <button class="delete-btn"><i class="fas fa-trash"></i></button>
                    </div>
                `;
                
                // Add event listeners
                const checkbox = todoItem.querySelector('input');
                const completeBtn = todoItem.querySelector('.complete-btn');
                const deleteBtn = todoItem.querySelector('.delete-btn');
                
                checkbox.addEventListener('change', () => toggleTodo(todo.id));
                completeBtn.addEventListener('click', () => toggleTodo(todo.id));
                deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
                
                todoList.appendChild(todoItem);
            });
        }
    }
    
    // Product Listing Functionality
    const productsGrid = document.querySelector('.products-grid');
    const categoryFilter = document.getElementById('category-filter');
    const sortSelect = document.getElementById('sort');
    
    const products = [
        {
            id: 1,
            name: 'Wireless Headphones',
            price: 129.99,
            rating: 4.5,
            category: 'electronics',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        },
        {
            id: 2,
            name: 'Smart Watch',
            price: 199.99,
            rating: 4.7,
            category: 'electronics',
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1099&q=80'
        },
        {
            id: 3,
            name: 'Cotton T-Shirt',
            price: 29.99,
            rating: 4.2,
            category: 'clothing',
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80'
        },
        {
            id: 4,
            name: 'Coffee Maker',
            price: 89.99,
            rating: 4.4,
            category: 'home',
            image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        },
        {
            id: 5,
            name: 'Running Shoes',
            price: 79.99,
            rating: 4.6,
            category: 'clothing',
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        },
        {
            id: 6,
            name: 'Bluetooth Speaker',
            price: 59.99,
            rating: 4.3,
            category: 'electronics',
            image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1137&q=80'
        }
    ];
    
    // Render products
    function renderProducts() {
        const category = categoryFilter.value;
        const sortBy = sortSelect.value;
        
        let filteredProducts = [];
        
        // Filter by category
        if (category === 'all') {
            filteredProducts = [...products];
        } else {
            filteredProducts = products.filter(product => product.category === category);
        }
        
        // Sort products
        if (sortBy === 'price-asc') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-desc') {
            filteredProducts.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating') {
            filteredProducts.sort((a, b) => b.rating - a.rating);
        }
        
        // Clear the grid
        productsGrid.innerHTML = '';
        
        // Render products
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="product-rating">
                        ${getRatingStars(product.rating)}
                    </div>
                    <span class="product-category">${product.category}</span>
                </div>
            `;
            
            productsGrid.appendChild(productCard);
        });
    }
    
    // Generate rating stars
    function getRatingStars(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }
    
    // Set up event listeners for products
    categoryFilter.addEventListener('change', renderProducts);
    sortSelect.addEventListener('change', renderProducts);
    
    // Initialize the apps
    init();
    renderProducts();
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                navLinks.classList.remove('active');
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});