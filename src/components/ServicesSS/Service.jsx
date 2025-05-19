import React, { useEffect, useState } from 'react';
import ServiceItem from './ServiceItem';
import { Navigation } from 'swiper/modules';
import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ErrorAlert from '../ErrorAlert';
import apiClient from '../../Services/api-client';
import { Link } from 'react-router';



const Service = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        apiClient.get("/services")
            .then(res => {
                setServices(res.data.results);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <section className='mx-auto py-16 bg-gray-50'>
            <div className='flex justify-between items-center px-4 md:px-16'>
                <h2 className='text-3xl md:text-4xl font-bold'>Popular Services</h2>
                <Link to="/shop" className="btn btn-primary px-6 py-6 rounded-full">See All</Link>
            </div>

            {loading ? (
                <div className='flex justify-center items-center my-10'>
                    <span className="loading loading-spinner loading-xl text-primary text-2xl"></span>
                </div>
            ) : error ? (
                <ErrorAlert message={error} />
            ) : (
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={1}
                    slidesPerView={5}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        1024: { slidesPerView: 5 },
                    }}
                    navigation
                >
                    {services.map(service => (
                        <SwiperSlide key={service.id} className="mx-14 my-10 flex justify-center">
                            <ServiceItem service={service} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </section>
    );
};

export default Service;
