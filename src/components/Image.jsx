import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Image({
  src,
  alt,
  className = '',
  eager = false,
  width,
  height,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/, '.webp');

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-800 animate-pulse" />
      )}
      
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <motion.img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          width={width}
          height={height}
          onLoad={() => setIsLoaded(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="object-cover w-full h-full"
          {...props}
        />
      </picture>
    </div>
  );
}
