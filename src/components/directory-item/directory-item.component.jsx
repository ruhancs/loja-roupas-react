import { useNavigate } from 'react-router-dom'

import './directory-item.styles.scss'

const DirectoryItem = (category) => {
    const { imageUrl,title,id,route } = category
    const navigate = useNavigate()

    const onNavigate = () => navigate(route)

    return (
        <div onClick={onNavigate} key={id} className="directory-item-container">
        <div 
          className='background-image' 
          style={{
            backgroundImage: `url(${imageUrl})`
          }} 
        />
        <div className="body">
          <h2>{ title }</h2>
          <p>Shop Now</p>
        </div>
      </div>
    )
}

export default DirectoryItem