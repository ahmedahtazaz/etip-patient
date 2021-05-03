export const base_url = "https://hlf-backend-1.azurewebsites.net";

export const send_otp_url = `/api/user/send-otp`;
export const verify_otp_url = `/api/user/verify-otp`;
export const signup_url = `${base_url}/api/user`;
export const get_user_url = `${base_url}/api/user`
export const add_family_url = `${base_url}/api/family/add-member`;
export const edit_family_url = `${base_url}/api/family/edit-member`;
export const get_family_url = `${base_url}/api/family`;

export const get_lang_url = `${base_url}/api/lang/org/${organizationName}`;

export const get_about_app_url = `${base_url}/settings/org/about/${organizationName}`;

export const get_policy_url = `${base_url}/settings/org/policy/${organizationName}`;
export const get_terms_url = `${base_url}/settings/org/terms/${organizationName}`;

export const organizationName = "eTip-german";