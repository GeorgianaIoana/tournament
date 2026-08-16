(function() {
    'use strict';

    // State
    let adminToken = localStorage.getItem('adminToken') || '';
    let registrations = [];
    let stats = {};
    let currentFilters = { status: '', category: '' };

    // DOM Elements
    const loginContainer = document.getElementById('loginContainer');
    const dashboard = document.getElementById('dashboard');
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');
    const tokenInput = document.getElementById('tokenInput');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const toastContainer = document.getElementById('toastContainer');

    // Stats elements
    const statTotal = document.getElementById('statTotal');
    const statPending = document.getElementById('statPending');
    const statPaid = document.getElementById('statPaid');
    const statConfirmed = document.getElementById('statConfirmed');
    const statRevenue = document.getElementById('statRevenue');

    // Table
    const tableBody = document.getElementById('tableBody');
    const emptyState = document.getElementById('emptyState');

    // Filters
    const filterStatus = document.getElementById('filterStatus');
    const filterCategory = document.getElementById('filterCategory');

    // Initialize
    function init() {
        if (adminToken) {
            showDashboard();
            loadRegistrations();
        } else {
            showLogin();
        }

        // Event listeners
        loginForm.addEventListener('submit', handleLogin);
        document.getElementById('btnLogout').addEventListener('click', handleLogout);
        document.getElementById('btnRefresh').addEventListener('click', loadRegistrations);
        document.getElementById('btnExport').addEventListener('click', handleExport);
        filterStatus.addEventListener('change', handleFilterChange);
        filterCategory.addEventListener('change', handleFilterChange);

        // Password toggle
        const togglePassword = document.getElementById('togglePassword');
        if (togglePassword) {
            togglePassword.addEventListener('click', function() {
                const input = document.getElementById('tokenInput');
                const eyeOpen = this.querySelector('.eye-open');
                const eyeClosed = this.querySelector('.eye-closed');

                if (input.type === 'password') {
                    input.type = 'text';
                    eyeOpen.style.display = 'none';
                    eyeClosed.style.display = 'block';
                } else {
                    input.type = 'password';
                    eyeOpen.style.display = 'block';
                    eyeClosed.style.display = 'none';
                }
            });
        }
    }

    // Auth
    async function handleLogin(e) {
        e.preventDefault();
        const token = tokenInput.value.trim();

        if (!token) {
            showLoginError('Please enter the password.');
            return;
        }

        showLoading();

        try {
            const response = await fetch('/api/admin/registrations', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.status === 401) {
                hideLoading();
                showLoginError('Invalid password.');
                return;
            }

            if (!response.ok) {
                throw new Error('Request failed');
            }

            adminToken = token;
            localStorage.setItem('adminToken', token);
            hideLoading();
            showDashboard();
            loadRegistrations();
        } catch (error) {
            hideLoading();
            showLoginError('Connection error. Please try again.');
        }
    }

    function handleLogout() {
        adminToken = '';
        localStorage.removeItem('adminToken');
        registrations = [];
        stats = {};
        showLogin();
    }

    function showLogin() {
        loginContainer.style.display = 'flex';
        dashboard.classList.remove('visible');
        tokenInput.value = '';
        hideLoginError();
    }

    function showDashboard() {
        loginContainer.style.display = 'none';
        dashboard.classList.add('visible');
    }

    function showLoginError(msg) {
        loginError.textContent = msg;
        loginError.classList.add('visible');
    }

    function hideLoginError() {
        loginError.classList.remove('visible');
    }

    // Data loading
    async function loadRegistrations() {
        showLoading();

        const params = new URLSearchParams();
        if (currentFilters.status) params.set('status', currentFilters.status);
        if (currentFilters.category) params.set('category', currentFilters.category);

        try {
            const response = await fetch(`/api/admin/registrations?${params}`, {
                headers: { 'Authorization': `Bearer ${adminToken}` }
            });

            if (response.status === 401) {
                handleLogout();
                showLoginError('Session expired. Please sign in again.');
                return;
            }

            if (!response.ok) {
                throw new Error('Failed to fetch');
            }

            const data = await response.json();
            registrations = data.registrations || [];
            stats = data.stats || {};

            updateStats();
            renderTable();
        } catch (error) {
            showToast('Failed to load data.', 'error');
        } finally {
            hideLoading();
        }
    }

    function updateStats() {
        statTotal.textContent = stats.total || 0;
        statPending.textContent = stats.pending || 0;
        statPaid.textContent = stats.paid || 0;
        statConfirmed.textContent = stats.confirmed || 0;
        statRevenue.textContent = `${(stats.totalRevenue || 0).toLocaleString('ro-RO')} RON`;
    }

    function renderTable() {
        if (registrations.length === 0) {
            tableBody.innerHTML = '';
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';

        tableBody.innerHTML = registrations.map(r => `
            <tr data-id="${r.id}">
                <td>
                    <div class="cell-name">${escapeHtml(r.full_name)}</div>
                    <div class="cell-email">${escapeHtml(r.email)}</div>
                </td>
                <td>${escapeHtml(r.phone)}</td>
                <td class="cell-fide">${escapeHtml(r.fide_id)}</td>
                <td>${escapeHtml(r.club)}</td>
                <td><span class="category-badge">${escapeHtml(r.category)}</span></td>
                <td>
                    ${r.is_free_entry
                        ? '<span class="free-badge">FREE</span>'
                        : `${(r.amount_ron / 100).toFixed(0)} RON`
                    }
                </td>
                <td>
                    <select class="status-select" data-id="${r.id}" onchange="window.updateStatus('${r.id}', this.value)">
                        <option value="pending" ${r.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="verifying" ${r.status === 'verifying' ? 'selected' : ''}>Verifying</option>
                        <option value="paid" ${r.status === 'paid' ? 'selected' : ''}>Paid</option>
                        <option value="confirmed" ${r.status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
                        <option value="cancelled" ${r.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </td>
                <td>${formatDate(r.created_at)}</td>
            </tr>
        `).join('');
    }

    // Status update
    window.updateStatus = async function(id, newStatus) {
        const select = document.querySelector(`select[data-id="${id}"]`);
        const originalValue = select.dataset.originalValue || select.value;
        select.dataset.originalValue = originalValue;

        try {
            const response = await fetch('/api/admin/registrations', {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, status: newStatus })
            });

            if (!response.ok) {
                throw new Error('Update failed');
            }

            showToast('Status updated!', 'success');

            // Refresh to update stats
            loadRegistrations();
        } catch (error) {
            select.value = originalValue;
            showToast('Update failed.', 'error');
        }
    };

    // Filters
    function handleFilterChange() {
        currentFilters.status = filterStatus.value;
        currentFilters.category = filterCategory.value;
        loadRegistrations();
    }

    // Export
    async function handleExport() {
        const params = new URLSearchParams();
        if (currentFilters.status) params.set('status', currentFilters.status);
        if (currentFilters.category) params.set('category', currentFilters.category);

        try {
            const response = await fetch(`/api/admin/export?${params}`, {
                headers: { 'Authorization': `Bearer ${adminToken}` }
            });

            if (!response.ok) {
                throw new Error('Export failed');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `registrations-${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();

            showToast('Export downloaded!', 'success');
        } catch (error) {
            showToast('Export failed.', 'error');
        }
    }

    // Helpers
    function escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function formatDate(dateStr) {
        if (!dateStr) return '-';
        return new Date(dateStr).toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    function showLoading() {
        loadingOverlay.classList.remove('hidden');
    }

    function hideLoading() {
        loadingOverlay.classList.add('hidden');
    }

    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // Start
    init();
})();
