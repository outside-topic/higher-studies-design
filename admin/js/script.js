document.addEventListener('DOMContentLoaded', function () {
    // Sidebar toggle functionality
    const sidebarCollapse = document.getElementById('sidebarCollapse');
    const sidebar = document.getElementById('sidebar');

    if (sidebarCollapse && sidebar) {
        sidebarCollapse.addEventListener('click', function () {
            sidebar.classList.toggle('active');
        });
    }

    // Initialize tooltips disabled for now, but ready if needed
    // const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    // tooltipTriggerList.map(function (tooltipTriggerEl) {
    //   return new bootstrap.Tooltip(tooltipTriggerEl);
    // });

    // Handle window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth > 991.98) {
            // Ensure sidebar is visible on desktop if it was hidden on mobile
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        }
    });

    // Dynamic Add Module Logic
    const addModuleBtn = document.getElementById('addModuleBtn');
    const modulesContainer = document.getElementById('modulesContainer');

    if (addModuleBtn && modulesContainer) {
        let moduleCount = modulesContainer.querySelectorAll('.module-item').length;
        addModuleBtn.addEventListener('click', function () {
            moduleCount++;
            const moduleHTML = `
                <div class="module-item bg-light p-4 rounded border mb-4 position-relative">
                    <button type="button" class="btn btn-sm btn-link text-danger position-absolute top-0 end-0 mt-2 me-2 remove-module-btn"><i class="bi bi-trash fs-5"></i></button>
                    <div class="row g-3">
                        <div class="col-md-9">
                            <label class="form-label fw-medium text-muted small">Module Title</label>
                            <input type="text" class="form-control bg-white shadow-sm border-0" placeholder="e.g. Strategic Management" required>
                        </div>
                        <div class="col-md-3">
                            <label class="form-label fw-medium text-muted small">Order</label>
                            <input type="number" class="form-control bg-white shadow-sm border-0" placeholder="e.g. ${moduleCount}" value="${moduleCount}" required>
                        </div>
                        <div class="col-12">
                            <label class="form-label fw-medium text-muted small">Module Description</label>
                            <textarea id="add_module_description" class="form-control bg-white shadow-sm border-0" rows="3" placeholder="Brief overview of module contents..."></textarea>
                        </div>
                    </div>
                </div>
            `;
            modulesContainer.insertAdjacentHTML('beforeend', moduleHTML);
            const allModuleDescriptionItems = document.querySelectorAll('#add_module_description')
            allModuleDescriptionItems.forEach(item => {
                const editor2 = Jodit.make(item);
            })
        });

        // Event delegation for module removal
        modulesContainer.addEventListener('click', function(e) {
            if (e.target.closest('.remove-module-btn')) {
                const moduleItem = e.target.closest('.module-item');
                if (moduleItem) {
                    moduleItem.remove();
                }
            }
        });
    }

    // Dynamic Add/Remove for simple single-input items (Entry Routes, Goals)
    const addDynamicBtns = document.querySelectorAll('.add-dynamic-btn');
    addDynamicBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const containerId = this.getAttribute('data-container');
            const placeholder = this.getAttribute('data-placeholder');
            const container = document.getElementById(containerId);
            
            if (container) {
                const itemHTML = `
                    <div class="dynamic-item bg-light p-3 rounded border mb-2 position-relative">
                        <button type="button" class="btn btn-sm btn-link text-danger position-absolute top-0 end-0 mt-1 me-1 remove-dynamic-btn"><i class="bi bi-trash"></i></button>
                        <input type="text" class="form-control bg-white shadow-sm border-0" placeholder="${placeholder}" required>
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', itemHTML);
            }
        });
    });

    // Global Event delegation for dynamic item removal
    document.addEventListener('click', function(e) {
        if (e.target.closest('.remove-dynamic-btn')) {
            const dynamicItem = e.target.closest('.dynamic-item');
            if (dynamicItem) {
                dynamicItem.remove();
            }
        }
    });
});
