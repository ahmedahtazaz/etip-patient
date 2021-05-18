import { IS_VERIFIER_APP } from "./Constants";

export const base_url = IS_VERIFIER_APP ? "https://etip-dtt-verifier.azurewebsites.net" : 'https://hlf-backend-1.azurewebsites.net';

export const send_otp_url = `/api/user/send-otp`;
export const verify_otp_url = `/api/user/verify-otp`;
export const update_phone_url = `/api/user/verify-update-phone`;

export const signup_url = `/api/user`;
export const get_user_url = `/api/user`;
export const update_user_email_url = `/api/user/update-email`;

export const add_family_url = `/api/family/add-member`;
export const edit_family_url = `/api/family/edit-member`;
export const get_family_url = `/api/family`;

export const get_lang_by_key_url = `/api/language`;
export const get_lang_keys_url = `/api/language/keys`;
export const get_def_lang_url = `/api/language/default`;

export const get_about_app_url = `/api/settings/about/en`;
export const get_policy_url = `/api/settings/policy/en`;
export const get_terms_url = `/api/settings/terms/en`;

export const get_lookup_url = `/api/lookup`;

export const get_test_centers = `/api/test-centers/`;

export const get_regions = `/api/region/Germany`;

export const get_appointment_slot_url = '/api/appointments/slots';
export const create_appointment_url = '/api/application';
export const get_active_appointments = '/api/appointments/active';

export const get_active_certificates = '/api/application/getActiveCertificates';
export const get_expired_certificates =
  '/api/application/getExpiredCertificates';


/* verifier app urls */


export const verify_pin_url = "/api/user/verifyPin";

export const get_test_points_url = "/api/testPoint/testPointList";

export const get_pending_applications_url = "/api/application/getPendingApplications"

export const get_start_application_url = "/api/application/startApplication";

export const issue_certificate_url = "/api/application/issueCertificate"

export const organizationName = 'eTip-german';
