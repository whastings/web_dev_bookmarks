# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string(50)       not null
#  email           :string(100)      not null
#  password_digest :string(60)
#  last_sign_in    :datetime
#  admin           :boolean          default(FALSE), not null
#  blocked         :boolean          default(FALSE), not null
#  created_at      :datetime
#  updated_at      :datetime
#

class User < ActiveRecord::Base
  has_secure_password

  # Constants:

  # Borrowed from Hartl's Rails Tutorial for now.
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  # Associations:
  has_many :sessions, dependent: :destroy
  has_many :category_subscriptions, foreign_key: :subscriber_id, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :resources
  has_many :category_feed_items, through: :category_subscriptions, source: :feed_items
  has_many :favorite_resources, through: :favorites, source: :resource
  has_many :votes
  has_many :comments

  # Validations:
  validates_presence_of :username, :email
  validates_uniqueness_of :username, :email
  validates :username, length: { maximum: 50 },
            format: { with: /\A[a-z0-9_\.-]+\z/i }
  validates :email, length: { maximum: 100 },
            format: { with: VALID_EMAIL_REGEX }

  def to_s
    username
  end

end
