<div class="left-side-menu">

                <div class="slimscroll-menu">

                    <!--- Sidemenu -->
                    <div id="sidebar-menu">

                        <ul class="metismenu" id="side-menu">

                            <li class="menu-title">Navigation</li>

                            <?php require_once(__DIR__ . '/permissions.php'); $dept = isset($_SESSION['dept']) ? $_SESSION['dept'] : null; ?>

                            <?php if (doc_is_allowed_route($dept, 'his_doc_dashboard.php')): ?>
                            <li>
                                <a href="his_doc_dashboard.php">
                                    <i class="fe-airplay"></i>
                                    <span> Dashboard </span>
                                </a>
                                
                            </li>
                            <?php endif; ?>

                            <?php if (
                                doc_is_allowed_route($dept, 'his_doc_register_patient.php') ||
                                doc_is_allowed_route($dept, 'his_doc_view_patients.php') ||
                                doc_is_allowed_route($dept, 'his_doc_manage_patient.php') ||
                                doc_is_allowed_route($dept, 'his_doc_discharge_patient.php') ||
                                doc_is_allowed_route($dept, 'his_doc_patient_transfer.php')
                            ): ?>
                            <li>
                                <a href="javascript: void(0);">
                                    <i class="fab fa-accessible-icon "></i>
                                    <span> Patients </span>
                                    <span class="menu-arrow"></span>
                                </a>
                                <ul class="nav-second-level" aria-expanded="false">
                                    <?php if (doc_is_allowed_route($dept, 'his_doc_register_patient.php')): ?>
                                    <li><a href="his_doc_register_patient.php">Register Patient</a></li>
                                    <?php endif; ?>
                                    <?php if (doc_is_allowed_route($dept, 'his_doc_view_patients.php')): ?>
                                    <li><a href="his_doc_view_patients.php">View Patients</a></li>
                                    <?php endif; ?>
                                    <?php if (doc_is_allowed_route($dept, 'his_doc_manage_patient.php')): ?>
                                    <li><a href="his_doc_manage_patient.php">Manage Patients</a></li>
                                    <?php endif; ?>
                                    <hr>
                                    <?php if (doc_is_allowed_route($dept, 'his_doc_discharge_patient.php')): ?>
                                    <li><a href="his_doc_discharge_patient.php">Discharge Patients</a></li>
                                    <?php endif; ?>
                                    <?php if (doc_is_allowed_route($dept, 'his_doc_patient_transfer.php')): ?>
                                    <li><a href="his_doc_patient_transfer.php">Patient Transfers</a></li>
                                    <?php endif; ?>
                                </ul>
                            </li>
                            <?php endif; ?>

                          

                            <?php if (
                                doc_is_allowed_route($dept, 'his_doc_add_pharm_cat.php') ||
                                doc_is_allowed_route($dept, 'his_doc_view_pharm_cat.php') ||
                                doc_is_allowed_route($dept, 'his_doc_manage_pharm_cat.php') ||
                                doc_is_allowed_route($dept, 'his_doc_add_pharmaceuticals.php') ||
                                doc_is_allowed_route($dept, 'his_doc_view_pharmaceuticals.php') ||
                                doc_is_allowed_route($dept, 'his_doc_manage_pharmaceuticals.php') ||
                                doc_is_allowed_route($dept, 'his_doc_add_presc.php') ||
                                doc_is_allowed_route($dept, 'his_doc_view_presc.php') ||
                                doc_is_allowed_route($dept, 'his_doc_manage_presc.php')
                            ): ?>
                            <li>
                                <a href="javascript: void(0);">
                                    <i class="mdi mdi-pill"></i>
                                    <span> Pharmacy </span>
                                    <span class="menu-arrow"></span>
                                </a>
                                <ul class="nav-second-level" aria-expanded="false">
                                    <?php if (doc_is_allowed_route($dept, 'his_doc_add_pharm_cat.php')): ?>
                                    <li><a href="his_doc_add_pharm_cat.php">Add Pharm Category</a></li>
                                    <?php endif; ?>
                                    <?php if (doc_is_allowed_route($dept, 'his_doc_view_pharm_cat.php')): ?>
                                    <li><a href="his_doc_view_pharm_cat.php">View Pharm Category</a></li>
                                    <?php endif; ?>
                                    <li>
                                        <a href="his_doc_manage_pharm_cat.php">Manage Pharm Category</a>
                                    </li>
                                    <hr>
                                    <?php if (doc_is_allowed_route($dept, 'his_doc_add_pharmaceuticals.php')): ?>
                                    <li><a href="his_doc_add_pharmaceuticals.php">Add Pharmaceuticals</a></li>
                                    <?php endif; ?>
                                    <?php if (doc_is_allowed_route($dept, 'his_doc_view_pharmaceuticals.php')): ?>
                                    <li><a href="his_doc_view_pharmaceuticals.php">View Pharmaceuticals</a></li>
                                    <?php endif; ?>
                                    <li>
                                        <a href="his_doc_manage_pharmaceuticals.php">Manage Pharmaceuticals</a>
                                    </li>
                                    <hr>
                                    <?php if (doc_is_allowed_route($dept, 'his_doc_add_presc.php')): ?>
                                    <li><a href="his_doc_add_presc.php">Add Prescriptions</a></li>
                                    <?php endif; ?>
                                    <?php if (doc_is_allowed_route($dept, 'his_doc_view_presc.php')): ?>
                                    <li><a href="his_doc_view_presc.php">View Prescriptions</a></li>
                                    <?php endif; ?>
                                    <?php if (doc_is_allowed_route($dept, 'his_doc_manage_presc.php')): ?>
                                    <li><a href="his_doc_manage_presc.php">Manage Prescriptions</a></li>
                                    <?php endif; ?>
                                </ul>
                            </li>
                            <?php endif; ?>

                            
                            <?php if (
                                doc_is_allowed_route($dept, 'his_doc_pharm_inventory.php') ||
                                doc_is_allowed_route($dept, 'his_doc_equipments_inventory.php')
                            ): ?>
                            <li>
                                <a href="javascript: void(0);">
                                    <i class=" fas fa-funnel-dollar "></i>
                                    <span> Inventory </span>
                                    <span class="menu-arrow"></span>
                                </a>
                                <ul class="nav-second-level" aria-expanded="false">
                                    <?php if (doc_is_allowed_route($dept, 'his_doc_pharm_inventory.php')): ?>
                                    <li><a href="his_doc_pharm_inventory.php">Pharmaceuticals</a></li>
                                    <?php endif; ?>
                                    <?php if (doc_is_allowed_route($dept, 'his_doc_equipments_inventory.php')): ?>
                                    <li><a href="his_doc_equipments_inventory.php">Assets</a></li>
                                    <?php endif; ?>
                                    
                                </ul>
                            </li>
                            <?php endif; ?>
                
                            <?php if (
                                doc_is_allowed_route($dept, 'his_doc_patient_lab_test.php') ||
                                doc_is_allowed_route($dept, 'his_doc_patient_lab_result.php') ||
                                doc_is_allowed_route($dept, 'his_doc_patient_lab_vitals.php') ||
                                doc_is_allowed_route($dept, 'his_doc_lab_report.php')
                            ): ?>
                            <li>
                                <a href="javascript: void(0);">
                                    <i class="mdi mdi-flask"></i>
                                    <span> Laboratory </span>
                                    <span class="menu-arrow"></span>
                                </a>
                                <ul class="nav-second-level" aria-expanded="false">
                                    <?php if (doc_is_allowed_route($dept, 'his_doc_patient_lab_test.php')): ?>
                                    <li><a href="his_doc_patient_lab_test.php">Patient Lab Tests</a></li>
                                    <?php endif; ?>
                                    <?php if (doc_is_allowed_route($dept, 'his_doc_patient_lab_result.php')): ?>
                                    <li><a href="his_doc_patient_lab_result.php">Patient Lab Results</a></li>
                                    <?php endif; ?>
                                    <?php if (doc_is_allowed_route($dept, 'his_doc_patient_lab_vitals.php')): ?>
                                    <li><a href="his_doc_patient_lab_vitals.php">Patient Vitals</a></li>
                                    <?php endif; ?>
                                    <?php if (doc_is_allowed_route($dept, 'his_doc_lab_report.php')): ?>
                                    <li><a href="his_doc_lab_report.php">Lab Reports</a></li>
                                    <?php endif; ?>
                                    <hr>
                                    
                                </ul>
                            </li>
                            <?php endif; ?>

                            <?php if (doc_is_allowed_route($dept, 'his_doc_view_payrolls.php')): ?>
                            <li>
                                <a href="javascript: void(0);">
                                    <i class="mdi mdi-cash-refund "></i>
                                    <span> Payrolls </span>
                                    <span class="menu-arrow"></span>
                                </a>
                                <ul class="nav-second-level" aria-expanded="false">
                                    
                                    <li>
                                        <a href="his_doc_view_payrolls.php">My Payrolls</a>
                                    </li>
                                </ul>
                            </li>
                            <?php endif; ?>

                            

                        </ul>

                    </div>
                    <!-- End Sidebar -->

                    <div class="clearfix"></div>

                </div>
                <!-- Sidebar -left -->

            </div>