export default function ProductFilters() {
  return (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Price Range</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="rounded" />
            <span className="ml-2">Under $50</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="rounded" />
            <span className="ml-2">$50 - $100</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="rounded" />
            <span className="ml-2">Over $100</span>
          </label>
        </div>
      </div>
      {/* Size Filter */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Size</h3>
        <div className="space-y-2">
          {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
            <label key={size} className="flex items-center">
              <input type="checkbox" className="rounded" />
              <span className="ml-2">{size}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Color</h3>
        <div className="space-y-2">
          {["White", "Black", "Blue", "Gray", "Brown"].map((color) => (
            <label key={color} className="flex items-center">
              <input type="checkbox" className="rounded" />
              <span className="ml-2">{color}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
