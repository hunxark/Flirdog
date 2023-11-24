package application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = { "application", "user.*", "product.*", "matching.*", "community.*", "order.*",
<<<<<<< HEAD
		"payment.*", "admin.*", "s3.*", "mypage.*", "somoim.*" })
@EntityScan({ "user.bean", "product.bean", "matching.bean", "community.bean", "order.bean", "payment.bean", "somoim.bean"  })
=======
		"payment.*", "admin.*", "s3.*", "ai.*" })
@EntityScan({ "user.bean", "product.bean", "matching.bean", "community.bean", "order.bean", "payment.bean", "ai.bean" })
>>>>>>> a9a871d (임시:1123_1956)
@EnableJpaRepositories({ "user.repository", "product.repository", "matching.repository", "community.repository",
		"order.repository", "payment.repository", "admin.repository", "mypage.repository" , "somoim.repository" })
@EnableJpaAuditing
public class FlirdogApplication {

	public static void main(String[] args) {
		SpringApplication.run(FlirdogApplication.class, args);
	}

}
