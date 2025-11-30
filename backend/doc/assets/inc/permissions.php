<?php
/* Department-based permissions for Doctor portal */
$DOC_COMMON_ALLOW = [
    'his_doc_dashboard.php',
    'his_doc_account.php',
    'his_doc_reset_pwd.php',
    'his_doc_logout.php',
    'his_doc_logout_partial.php',
];

$DOC_PERMISSIONS = [
    'Pharmacy' => array_merge($DOC_COMMON_ALLOW, [
        // Pharmacy catalog & prescriptions
        'his_doc_add_pharm_cat.php', 'his_doc_view_pharm_cat.php', 'his_doc_manage_pharm_cat.php',
        'his_doc_add_pharmaceuticals.php', 'his_doc_view_pharmaceuticals.php', 'his_doc_manage_pharmaceuticals.php',
        'his_doc_add_presc.php', 'his_doc_view_presc.php', 'his_doc_manage_presc.php', 'his_doc_upate_single_pres.php', 'his_doc_view_single_pres.php',
        // Inventory visibility relevant to pharmacy
        'his_doc_pharm_inventory.php',
    ]),

    'Laboratory' => array_merge($DOC_COMMON_ALLOW, [
        'his_doc_patient_lab_test.php', 'his_doc_add_single_lab_test.php',
        'his_doc_patient_lab_result.php', 'his_doc_add_single_lab_result.php', 'his_doc_view_single_lab_record.php',
        'his_doc_patient_lab_vitals.php', 'his_doc_add_single_patient_vitals.php',
        'his_doc_lab_report.php',
    ]),

    'Accounting' => array_merge($DOC_COMMON_ALLOW, [
        'his_doc_view_payrolls.php', 'his_doc_view_single_payroll.php',
        // optionally allow inventory/assets viewing for reconciliation
        'his_doc_equipments_inventory.php', 'his_doc_pharm_inventory.php',
    ]),

    'Inventory' => array_merge($DOC_COMMON_ALLOW, [
        'his_doc_equipments_inventory.php', 'his_doc_view_single_eqp.php',
        'his_doc_pharm_inventory.php',
    ]),

    'Clinical' => array_merge($DOC_COMMON_ALLOW, [
        // Patient care features
        'his_doc_register_patient.php', 'his_doc_view_patients.php', 'his_doc_manage_patient.php', 'his_doc_update_single_patient.php', 'his_doc_view_single_patient.php',
        'his_doc_discharge_patient.php', 'his_doc_discharge_single_patient.php',
        'his_doc_patient_transfer.php', 'his_doc_transfer_single_patient.php',
        // Interact with lab and prescriptions
        'his_doc_patient_lab_vitals.php', 'his_doc_add_single_patient_vitals.php',
        'his_doc_patient_lab_test.php', 'his_doc_patient_lab_result.php', 'his_doc_lab_report.php',
        'his_doc_add_presc.php', 'his_doc_view_presc.php',
    ]),

    'Admin' => ['*'],
];

function doc_is_allowed_route($dept, $route)
{
    global $DOC_PERMISSIONS, $DOC_COMMON_ALLOW;
    if (!$route) return true;
    // If dept not set yet, allow all (pre-migration fallback)
    if (!$dept) return true;
    $allow = $DOC_PERMISSIONS[$dept] ?? $DOC_COMMON_ALLOW;
    if ($allow === ['*']) return true;
    return in_array($route, $allow, true);
}

function doc_check_permission_or_redirect()
{
    // expects $_SESSION['dept'] to be set at login
    $route = basename($_SERVER['PHP_SELF']);
    $dept = isset($_SESSION['dept']) ? $_SESSION['dept'] : null;
    if (!$dept) return; // no dept assigned yet; do not enforce
    if (!doc_is_allowed_route($dept, $route)) {
        header('Location: his_doc_dashboard.php');
        exit;
    }
}
?>
