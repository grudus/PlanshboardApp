package com.grudus.planshboard

import com.grudus.planshboard.configuration.spring.PlanshboardContext
import com.grudus.planshboard.env.EnvironmentKeys
import com.grudus.planshboard.env.EnvironmentService
import org.springframework.boot.jdbc.DataSourceBuilder
import org.springframework.context.annotation.*
import javax.sql.DataSource

@Configuration
@Import(PlanshboardContext::class)
@PropertySource("classpath:/test.properties")
@ComponentScan("com.grudus.planshboard")
class TestContext {

    @Bean
    @Primary
    fun primaryDataSource(env: EnvironmentService): DataSource =
        DataSourceBuilder.create()
            .url(env.getText(EnvironmentKeys.SPRING_DATASOURCE_URL))
            .username(env.getText(EnvironmentKeys.SPRING_DATASOURCE_USERNAME))
            .password(env.getText(EnvironmentKeys.SPRING_DATASOURCE_PASSWORD))
            .driverClassName(env.getText(EnvironmentKeys.SPRING_DATASOURCE_DRIVER_CLASS_NAME))
            .build()
}
