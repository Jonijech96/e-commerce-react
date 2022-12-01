import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({product}) => {
  return (
    <Link to={`/products/${product.id}`}>
              <div className="card w-96 bg-base-100 shadow-xl divide-y">
                <figure className="h-64">
                  <img
                    src={product.productImgs?.[0]}
                    alt="Shoes"
                    className="h-4/5	"
                  />
                </figure>
                <div className="card-body">
          <div className="badge badge-outline">{product.category.name}</div>

                  <h2 className="card-title">{product.title}</h2>
                  <span className="text-slate-500">Price</span>
                  <p className="font-bold">${product.price}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
            </Link>
  )
}

export default Card