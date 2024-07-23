
// TODO Replace with your service account json
const SERVICE_ACCOUNT = {
  "type": "service_account",
  "project_id": "yourproject",
  "private_key_id": "askl;jcas;kljcahsnoic82[0j[229i-]ipwejoejwlkj]",
  "private_key": "-----BEGIN PRIVATE KEY-----\ndskldlsknslknsdlknvsd/lksndlsdls dv'lk s/dlv /lsmdv l/bQ==\n-----END PRIVATE KEY-----\n",
  "client_email": "impact-ai@yourproject.iam.gserviceaccount.com",
  "client_id": "112292906597122698971",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/impact-ai%40yourproject.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}


/**
 * Creates variables for the service account key and email address.
 * Authorization to AutoML requires a GCP service account with role of 'AutoML Predictor'.
 **/
// Sets variable for service account key.
var PRIVATE_KEY = SERVICE_ACCOUNT.private_key;
// Sets variable for service account email address.
var CLIENT_EMAIL = SERVICE_ACCOUNT.client_email;

/**
 * Reset the authorization state, so that it can be re-tested.
 */
function reset() {
  var service = getService();
  service.reset();
}

/**
 * Configures the service.
 */
function getService() {
  return OAuth2.createService('GCP')
      // Set the endpoint URL.
      .setTokenUrl('https://accounts.google.com/o/oauth2/token')

      // Set the private key and issuer.
      .setPrivateKey(PRIVATE_KEY)
      .setIssuer(CLIENT_EMAIL)

      // Set the property store where authorized tokens should be persisted.
      .setPropertyStore(PropertiesService.getScriptProperties())

      // Set the scope. This must match one of the scopes configured during the
      // setup of domain-wide delegation.
      .setScope(['https://www.googleapis.com/auth/cloud-platform']);
}