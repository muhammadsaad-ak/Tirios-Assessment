import React from 'react'
import { motion } from 'framer-motion';

const NotFound = () => {
    return (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45 }} className='min-h-screen bg-secondary-50 dark:bg-secondary-950 flex items-center justify-center'>
            <div className="text-center">
                <motion.h1 whileHover={{ y: -6 }} className='text-4xl md:text-5xl font-bold dark:text-white mb-6'>Page not found</motion.h1>
                <motion.p initial={{ opacity: 0.9 }} animate={{ opacity: 1 }} className='text-xl dark:text-secondary-300'>Error 404: The page your're looking for does not exist!</motion.p>
            </div>
        </motion.div>
    )
}

export default NotFound;
