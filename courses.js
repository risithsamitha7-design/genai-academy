// Courses Page JavaScript

// Search functionality
const courseSearch = document.getElementById('courseSearch');
const coursesGrid = document.getElementById('coursesGrid');
const courseCards = document.querySelectorAll('.course-card');
const noResults = document.getElementById('noResults');
const filterBtns = document.querySelectorAll('.filter-btn');

// Search courses
function searchCourses(query) {
    const searchTerm = query.toLowerCase().trim();
    let visibleCount = 0;
    
    courseCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
        const level = card.getAttribute('data-level').toLowerCase();
        const category = card.getAttribute('data-category').toLowerCase();
        
        const matchesSearch = title.includes(searchTerm) || 
                             description.includes(searchTerm) || 
                             tags.some(tag => tag.includes(searchTerm)) ||
                             level.includes(searchTerm) ||
                             category.includes(searchTerm);
        
        // Check if matches current filter
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        const matchesFilter = activeFilter === 'all' || card.getAttribute('data-level') === activeFilter;
        
        if (matchesSearch && matchesFilter) {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });
    
    // Show/hide no results message
    if (visibleCount === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
    }
}

// Filter courses
function filterCourses(filter) {
    const searchTerm = courseSearch.value.toLowerCase().trim();
    let visibleCount = 0;
    
    courseCards.forEach(card => {
        const level = card.getAttribute('data-level');
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
        
        const matchesFilter = filter === 'all' || level === filter;
        const matchesSearch = !searchTerm || 
                             title.includes(searchTerm) || 
                             description.includes(searchTerm) || 
                             tags.some(tag => tag.includes(searchTerm));
        
        if (matchesFilter && matchesSearch) {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });
    
    // Show/hide no results message
    if (visibleCount === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
    }
}

// Search input event listener
courseSearch.addEventListener('input', (e) => {
    searchCourses(e.target.value);
});

// Filter button event listeners
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        // Filter courses
        filterCourses(btn.getAttribute('data-filter'));
    });
});

// Enroll button click handler
document.querySelectorAll('.course-footer .btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const courseCard = e.target.closest('.course-card');
        const courseTitle = courseCard.querySelector('h3').textContent;
        
        // Show signup modal or alert
        const signupModal = document.getElementById('signupModal');
        if (signupModal) {
            signupModal.classList.add('active');
        } else {
            alert(`Please sign up to enroll in "${courseTitle}"`);
        }
    });
});

// Smooth scroll animation for course cards
const courseObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const courseObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, courseObserverOptions);

// Initialize course cards with animation
courseCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    card.style.transitionDelay = `${index * 0.05}s`;
    courseObserver.observe(card);
});

// Clear search when clicking the X (if browser adds one)
courseSearch.addEventListener('search', (e) => {
    if (e.target.value === '') {
        searchCourses('');
    }
});

// Keyboard shortcut: Press / to focus search
document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== courseSearch) {
        e.preventDefault();
        courseSearch.focus();
    }
    
    // Press Escape to clear search
    if (e.key === 'Escape' && document.activeElement === courseSearch) {
        courseSearch.value = '';
        searchCourses('');
        courseSearch.blur();
    }
});

console.log('Courses page loaded with search and filter functionality');
