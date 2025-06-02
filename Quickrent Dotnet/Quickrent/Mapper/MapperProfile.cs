using AutoMapper;
using Quickrent.DTO.UserDTO;
using Quickrent.DTO.OrderDTO;
using Quickrent.Model;
using Quickrent.DTO;
using QuickRent.DTO.UserDTO;
using Quickrent.DTO.ProductDTO;

namespace OnlineTicketBookingAPI.Mapper
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            /*
            ADD MAPPING IN THE FORMAT GIVEN BELOW
            ----------------------------------------
            CreateMap<Booking, ResBookingGetAllDto>()
                .ForMember(dest => dest.Event, opt => opt.MapFrom(source => source.Event.Title))
                .ReverseMap();
            */

            CreateMap<User, ReqRegisterUserDto>().ReverseMap();

            CreateMap<Product, ResponseCategoryDto>().ReverseMap();
            
            CreateMap<Order, ReqAddOrderDto>().ReverseMap();

            CreateMap<Order, ResGetOrderByIdDto>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(source => source.User.FirstName))
                .ForMember(dest => dest.ProductName, opt => opt.MapFrom(source => source.Product.Title))
                .ForMember(dest => dest.Image, opt => opt.MapFrom(source => source.Product.Image))
                .ReverseMap();

            CreateMap<Order, ResGetOrderByOrderIdDto>()
                .ForMember(dest => dest.productTitle, opt => opt.MapFrom(source => source.Product.Title))
                .ForMember(dest => dest.productBrand, opt => opt.MapFrom(source => source.Product.BrandName))
                .ForMember(dest => dest.productSellerName, 
                            opt => opt.MapFrom(source => source.Product.User.FirstName + " " + source.Product.User.LastName))
                .ForMember(dest => dest.customerName, 
                            opt => opt.MapFrom(source => source.User.FirstName + " " + source.User.LastName))
                .ForMember(dest => dest.customerEmail, opt => opt.MapFrom(source => source.User.Email))
                .ForMember(dest => dest.phoneNo, opt => opt.MapFrom(source => source.User.PhoneNo))
                .ForMember(dest => dest.productImage, opt => opt.MapFrom(source => source.Product.Image))
                .ReverseMap();

            CreateMap<Query, ContactQueryDto>().ReverseMap();
            CreateMap<User, GetUserDetailsDto>().ReverseMap();

            CreateMap<SellerProductAddDTO, Product>()
            .ForMember(dest => dest.Specifications, opt => opt.MapFrom(src => src.Specifications))
            .ForMember(dest => dest.Image, opt => opt.MapFrom(src => src.Image)).ReverseMap();
        }
    }
}
