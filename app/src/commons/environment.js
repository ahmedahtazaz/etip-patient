export const base_url = "http://localhost:3000";

export const send_otp_url = `${base_url}/api/user/send-otp`;

export const get_lang_url = `${base_url}/api/lang/org/${organizationName}`;

export const get_about_app_url = `${base_url}/settings/org/about/${organizationName}`;

export const get_policy_url = `${base_url}/settings/org/policy/${organizationName}`;
export const get_terms_url = `${base_url}/settings/org/terms/${organizationName}`;

export const organizationName = "Systems Ltd";