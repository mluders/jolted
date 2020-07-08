Aws.config.update({
  region: 'us-west-1',
  credentials: Aws::Credentials.new(
    Rails.application.credentials.dig(:aws, :access_key_id),
    Rails.application.credentials.dig(:aws, :secret_access_key)
  ),
})

S3_USER_UPLOAD_BUCKET = Aws::S3::Resource.new.bucket(ENV['S3_USER_UPLOAD_BUCKET'])
