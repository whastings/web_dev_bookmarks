json.(@category, :id, :name, :parent_id)
json.children @children do |child|
  json.(child, :id, :name, :slug)
end
json.resources @resources, partial: 'api/resources/resource_teaser', as: :resource
