const load_data = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(response => response.json())
        .then(data => display_categories(data.data.news_category))
        .catch(error => console.log(error));
}
const display_categories = category_data => {
    // console.log(category_data);
    const news_category = document.getElementById('news_category');
    category_data.forEach(category => {
        const news_category_item = document.createElement('li');
        news_category_item.classList.add('category_item');
        news_category_item.innerHTML = `
        <a class="${category.category_id}" onclick="load_news_data('${category.category_id}')">${category.category_name}</a>
        `;
        news_category.appendChild(news_category_item);
    })

}

const load_news_data = category_id => {
    toggle_spinner(true);
    fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
        .then(res => res.json())
        .then(data => load_news(data.data, data.status))
        .catch(error => console.log(error));
}

const load_news = (news_data, data_status) => {
    news_total_found(news_data);

    // console.log(news_data);
    const news_section = document.getElementById('news_section');
    news_section.innerHTML = '';

    if (data_status == true) {
        news_data.forEach(news => {
            // console.log(news);
            const news_area = document.createElement('div');
            news_area.classList.add('news_area');

            news_area.innerHTML = `
            <div class="news_img">
                <img src="${news.thumbnail_url ? news.thumbnail_url : 'No Image Found'}" alt="">
            </div>
            <div class="news_info">
                <h3>${news.title ? news.title : 'No Title Found'}</h3>
                <p class="news_details">${news.details}</p>
                <p class="details"> ${news.details}</p>
                <div>
                    <div class="news_publish_information">
                        <div class="news_ancor">
                            <div class="news_ancor_img">
                                <img src="${news.author.img? news.author.img:'No image'}" alt="">
                            </div>
                            <div class="auther">
                                <p>${news.author.name ? news.author.name : 'No Data'}</p>
                                <p>${news.author.published_date ? news.author.published_date : 'No Date Found'}</p>
                            </div>
                        </div>
                        <div class="total_viwe">
                            <p class="viwes"><i class="fa-regular fa-eye"></i> ${news.total_view ? news.total_view : 'NO Viwe Count'}</p>
                        </div>
                        <div class="star">
                            <i class="fa-regular fa-star-half-stroke"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="Right_arrow_news">
                        <button onclick="load_news_details('${news._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Details
                        </button>
                        </div>
                    </div>
                </div>
            </div>
            `;
            news_section.appendChild(news_area);
        })
    } else {
        const no_news_found = document.createElement('div');
        no_news_found.classList.add('no_news');
        no_news_found.innerHTML = `<h2>No News Available</h2>`;
        news_section.appendChild(no_news_found);
    }

    ;
    toggle_spinner(false);

}

const toggle_spinner = is_loading => {
    const load_section = document.querySelector('#loader');
    if (is_loading) {
        load_section.classList.remove('d-none');
    } else {
        load_section.classList.add('d-none');
    };
};

const news_total_found = (news) => {
    const news_total_found = document.getElementById('news_total_found');
    news_total_found.innerHTML = `
    ${news.length} items found for category Entertainment
    `;
}
load_news_data('08');
load_data();

const load_news_details = (news_id) => {
    fetch(`https://openapi.programming-hero.com/api/news/${news_id}`)
        .then(res => res.json())
        .then(data => display_news_details(data.data[0]))
        .catch(error => console.log(error));
}

const display_news_details = (data) => {
    const news_title = document.getElementById('news_title');
    news_title.innerText = data.title;
    const News_Details = document.getElementById('News_Details');
    News_Details.innerText = data.details;
    console.log(data)
}

document.getElementById('news_category').addEventListener('click', function (event) {
    const all_category = event.target;
    if (all_category)
        console.log(all_category.parentElement);
    // if(event.target.classList!==)
    // event.target.classList.add('active_news');
})