export default function DestinationImages({ images }) {
  if (!images || images.length === 0) {
    return null
  }

  return (
    <div className="glass-effect rounded-2xl p-6 border border-white/10">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">Destination Highlights</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative group overflow-hidden rounded-xl">
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-white text-sm font-medium">{image.alt}</p>
                <p className="text-gray-300 text-xs">
                  Photo by{' '}
                  <a
                    href={image.photographerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-blue-200 transition-colors"
                  >
                    {image.photographer}
                  </a>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
