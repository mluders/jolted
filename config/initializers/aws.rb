Aws.config.update({
  region: 'us-west-2',
  credentials: Aws::Credentials.new(
    Rails.application.credentials.dig(:aws, :access_key_id),
    Rails.application.credentials.dig(:aws, :secret_access_key)
  ),
})

S3_USER_UPLOAD_BUCKET = Aws::S3::Resource.new.bucket(ENV.fetch('S3_USER_UPLOAD_BUCKET'))
